import React, { useContext, useEffect, useState } from "react";
import "./ProductDetailePage.css";
import { ProductContext } from "../../Context/ProductContext";
import PriceBox from "../PriceBox/PriceBox";
import { CartContext } from "../../Context/CartContext";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext.jsx";
import SlideShow from "../SlideShow/SlideShow.jsx";
import ProductDetailes from "../ProductDetails/ProductDetails.jsx";
import CommentsList from "../CommentsList/CommentsList.jsx";
import ProductDeepDatails from "../ProductDeepDetails/ProductDeepDatails.jsx";

const SkeletonBox = ({ style, className }) => (
  <div className={"skeleton-box " + (className || "")} style={{ background: "#ececec", borderRadius: 8, ...style }} />
);

const ProductDetailSkeleton = () => (
  <div className="productDetailPage">
    <div className="slideShow-details">
      <div className="slideShow">
        <SkeletonBox style={{ width: "100%", height: 320, marginBottom: 24 }} />
      </div>
      <div className="productDetails">
        <SkeletonBox style={{ width: "60%", height: 32, marginBottom: 16 }} />
        <SkeletonBox style={{ width: "40%", height: 20, marginBottom: 16 }} />
        <SkeletonBox style={{ width: "100%", height: 80, marginBottom: 12 }} />
        <SkeletonBox style={{ width: "100%", height: 60, marginBottom: 12 }} />
        <SkeletonBox style={{ width: "100%", height: 40, marginBottom: 12 }} />
      </div>
      <div className="productDeepDatails">
        <SkeletonBox style={{ width: "100%", height: 80, marginBottom: 12 }} />
        <SkeletonBox style={{ width: "100%", height: 40, marginBottom: 12 }} />
      </div>
    </div>
    <div className="priceBox">
      <SkeletonBox style={{ width: "100%", height: 220, marginBottom: 16 }} />
    </div>
    <div className="comments">
      <SkeletonBox style={{ width: "100%", height: 60, marginBottom: 12 }} />
      <SkeletonBox style={{ width: "100%", height: 80, marginBottom: 12 }} />
      <SkeletonBox style={{ width: "100%", height: 80, marginBottom: 12 }} />
    </div>
  </div>
);

const ProductDetailPage = () => {
    const { addProductReview, selectedProduct, productLoading, productError, fetchProductById } = useContext(ProductContext);
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
        return <ProductDetailSkeleton />;
    }

    if (productError) {
        return <div>Error: {productError}</div>;
    }

    if (!selectedProduct) {
        return <div>Product not found</div>;
    }

    return (
        <div className="productDetailPage">
            <div className="slideShow-details">
                <div className="slideShow">
                    <SlideShow imgSrcs={productImgs}/> 
                </div>
                <div className="productDetails">
                    <ProductDetailes product={selectedProduct} />
                </div>
                <div className="productDeepDatails">
                    <ProductDeepDatails product={selectedProduct} />
                </div>                
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
            <div className="comments">
                <CommentsList comments={selectedProduct.reviews} addReviewFunc={addProductReview} product={selectedProduct} />
            </div>
        </div>
    );
}

export default ProductDetailPage;