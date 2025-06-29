import React, { useContext, useEffect, useState } from "react";
import "./ProductDetailePage.css";
import { ProductContext } from "../../Context/ProductContext";
import PriceBox from "../PriceBox/PriceBox";
import { CartContext } from "../../Context/CartContext";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext.jsx";


const ProductDetailPage = () => {
    const { selectedProduct, productLoading, productError, fetchProductById } = useContext(ProductContext);
    const { addItem, removeItem, updateQuantity } = useContext(CartContext);
    const { user } = useContext(AuthContext);
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            fetchProductById(id);
        }
    }, [id]);

    if (productLoading) {
        return <div>Loading product...</div>;
    }

    if (productError) {
        return <div>Error: {productError}</div>;
    }

    if (!selectedProduct) {
        return <div>Product not found</div>;
    }

    return (
        <div className="productDetailPage">
            <PriceBox 
                product={selectedProduct} 
                user={user} 
                addItem={addItem}
                removeItem={removeItem}
                updateQuantity={updateQuantity}
            />
        </div>
    );
}

export default ProductDetailPage;