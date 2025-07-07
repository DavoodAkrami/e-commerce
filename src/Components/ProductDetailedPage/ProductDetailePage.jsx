import React, { useContext, useEffect, useState } from "react";
import "./ProductDetailePage.css";
import { ProductContext } from "../../Context/ProductContext";
import PriceBox from "../PriceBox/PriceBox";
import { CartContext } from "../../Context/CartContext";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext.jsx";
import SlideShow from "../SlideShow/SlideShow.jsx";
import ProductDetailes from "../ProductDetails/ProductDetails.jsx";


const ProductDetailPage = () => {
    const { selectedProduct, productLoading, productError, fetchProductById } = useContext(ProductContext);
    const { addItem, removeItem, getProductQuantity, updateQuantity, cartLoading } = useContext(CartContext);
    const { user } = useContext(AuthContext);
    const { id } = useParams();
    const [ productImgs , setProductImgs ] = useState([]);

    useEffect(() => {
        if (id) {
            fetchProductById(id);
        }
    }, [id]);

    useEffect(() => {
        if (selectedProduct && Array.isArray(selectedProduct.images)) {
            setProductImgs(selectedProduct.images);
        } else {
            setProductImgs([]);
        }
    }, [selectedProduct]);

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
            <div className="slideShow">
                <SlideShow imgSrcs={productImgs}/> 
            </div>
            <div className="productDetails">
                <ProductDetailes product={selectedProduct} />
            </div>
            <div className="priceBox">
                <PriceBox 
                    product={selectedProduct} 
                    user={user} 
                    addItem={addItem}
                    removeItem={removeItem}
                    updateQuantity={updateQuantity}
                    getProductQuantity={getProductQuantity}
                />
            </div>
        </div>
    );
}

export default ProductDetailPage;