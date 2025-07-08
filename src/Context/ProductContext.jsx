import React, { createContext, useState, useEffect, useReducer } from "react";


export const ProductContext = createContext();

const initialState = {
    products: [],
    loading: false,
    error: null,
    selectedProduct: null, 
    productLoading: false,
    productError: null,
    filters: {
        search: '',
        category: '',
        brand: '',
        price_min: '',
        price_max: ''
    },
}



const ProductReducer = (state, action) => {
    switch (action.type) {
        case "FETCH_PRODUCTS_START":
            return { ...state, loading: true }
        case "FETCH_PRODUCTS_SUCCESS": 
            return { ...state, loading: false, error: null, products: action.payload.products }
        case "FETCH_PRODUCTS_ERROR": 
            return { ...state, loading: false, error: action.payload}
        case "SET_FILTERS":
            return { ...state, filters: { ...state.filters, ...action.payload } }
        case "CLEAR_FILTERS":
            return { ...state, filters: initialState.filters }
        case "FETCH_PRODUCT_START":
            return { ...state, productLoading: true }
        case "FETCH_PRODUCT_SUCCESS":
            return { ...state, productLoading: false, selectedProduct: action.payload, productError: null }
        case "FETCH_PRODUCT_ERROR": 
            return { ...state, productError: action.payload, loading: false }
        case "CLEAR_SELECTED_PRODUCT":
            return { ...state, selectedProduct: null, productError: null }
        default:
            return state;
    };
};

const buildApiUrl = (filters) => {
    const baseUrl = "https://dummyjson.com/products";
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
        if (value && value !== '') {
            params.append(key, value);
        }
    });
    return params.toString() ? `${baseUrl}?${params.toString()}` : baseUrl;
}



export const ProductProvider = ({children}) => {
    const [state, dispatch] = useReducer(ProductReducer, initialState);


    const fetchProducts = async (filters = state.filters) => {
        dispatch({ type: "FETCH_PRODUCTS_START" });
        try {
            const url = buildApiUrl(filters);
            const res = await fetch(url);
            const data = await res.json();
            if (res.ok) {
                dispatch({ 
                    type: "FETCH_PRODUCTS_SUCCESS", 
                    payload: { products: data.products }
                });
            } else {
                dispatch({ type: "FETCH_PRODUCTS_ERROR", payload: "Failed to fetch products" });
            }
        } catch (error) {
            dispatch({ type: "FETCH_PRODUCTS_ERROR", payload: error.message });
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const applyFilters = (newFilters) => {
        const updatedFilters = { ...state.filters, ...newFilters };
        dispatch({ type: "SET_FILTERS", payload: updatedFilters });
        fetchProducts(updatedFilters);
    };
    
    const clearFilters = () => {
        dispatch({ type: "CLEAR_FILTERS" });
        fetchProducts(initialState.filters);
    };

    const fetchProductById = async (id) => {
        dispatch({ type: "FETCH_PRODUCT_START" });
        try {
            const res = await fetch(`https://dummyjson.com/products/${id}`);
            const data = await res.json();
            if (res.ok) {
                // Merge local comments
                const localKey = `product-comments-${id}`;
                const localComments = JSON.parse(localStorage.getItem(localKey)) || [];
                const mergedReviews = [...(data.reviews || []), ...localComments];
                const mergedProduct = { ...data, reviews: mergedReviews };
                dispatch({ type: "FETCH_PRODUCT_SUCCESS", payload: mergedProduct });
            } else {
                dispatch({ type: "FETCH_PRODUCT_ERROR", payload: "failed" });
            }
        } catch(error) {
            dispatch({ type: "FETCH_PRODUCT_ERROR", payload: error.message });
        }
    }

    const clearSelectedProduct = () => {
        dispatch({ type: "CLEAR_SELECTED_PRODUCT" });
    };

    const addProductReview = async ({productId, newReview}) => {
        try {
            const product = state.selectedProduct;
            const updatedReviews = [...(product.reviews || []), newReview];


            const localKey = `product-comments-${productId}`;
            const localComments = JSON.parse(localStorage.getItem(localKey)) || [];
            localComments.push(newReview);
            localStorage.setItem(localKey, JSON.stringify(localComments));


            await fetch(`https://dummyjson.com/products/${productId}`, {
                method: "PUT",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ reviews: updatedReviews }),
            });


            const updatedProduct = { ...product, reviews: updatedReviews };
            dispatch({ type: "FETCH_PRODUCT_SUCCESS", payload: updatedProduct });
            return updatedProduct; 
        } catch (error) {
            console.error("Error adding review:", error);
            dispatch({ type: "FETCH_PRODUCT_ERROR", payload: error.message });
            throw error;
        }   
    }

    return (
        <ProductContext.Provider value={{       
            products: state.products,
            loading: state.loading,
            productError: state.productError,
            productLoading: state.productLoading,
            error: state.error,
            filters: state.filters,
            selectedProduct: state.selectedProduct,
            applyFilters,
            clearFilters,
            fetchProducts,
            fetchProductById,
            clearSelectedProduct,
            addProductReview
            }}
        >
            {children}
        </ProductContext.Provider>
    )
}

export default ProductProvider;

