import React, { createContext, useState, useEffect, useReducer } from "react";


export const ProductContext = createContext();

const initialState = {
    products: [],
    loading: false,
    error: null,
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

    return (
        <ProductContext.Provider value={{       
            products: state.products,
            loading: state.loading,
            error: state.error,
            filters: state.filters,
            totalProducts: state.totalProducts,
            applyFilters,
            clearFilters,
            fetchProducts
            }}>
            {children}
        </ProductContext.Provider>
    )
}

export default ProductProvider;

