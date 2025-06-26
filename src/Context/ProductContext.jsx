import React, { createContext, useState, useEffect } from "react";


export const ProductContext = createContext();

export const ProductProvider = ({children}) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const res = await fetch('https://dummyjson.com/products');
            const data = await res.json();
            setProducts(data.products);
        } catch (error) {
            console.error("error", error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <ProductContext.Provider value={{products, loading}}>
            {children}
        </ProductContext.Provider>
    )
}

export default ProductProvider;

