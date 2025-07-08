import React from "react";
import "./ProductDetails.css"
import { CiStar } from "react-icons/ci";
import { BiCategory } from "react-icons/bi";

const ProductDetailes = ({product}) => {
    const ratings = Array.isArray(product.reviews) ? product.reviews.map(r => r.rating) : [];
    const averageRating = ratings.length
      ? (ratings.reduce((sum, r) => sum + Number(r), 0) / ratings.length).toFixed(2)
      : product.rating || 0;
    return (
        <div className="productDetails">
            <div className="title-rate">
                <h1 className="title">
                    {product.title}
                </h1>
                <div className="rate">
                    <span>{averageRating}</span>
                    <CiStar className="star"/> 
                </div>
            </div>
            <hr className="hr-details" />
            <dic className="category">
                <BiCategory className="categoryIcon"/>
                {product.category}
            </dic>
            <div className="details">
                <div>
                <span className="detialTitle">Brand:</span> {product.brand}
                </div>
                <div>
                    <span className="detialTitle tagTitle">Tags:</span> {Array.isArray(product.tags) ? product.tags.map((tag, index) => <span key={index} className="tagsSpan">{tag}</span>) : null}
                </div>
                <div className="description">
                    <span className="detialTitle">Discription:</span> {product.description}
                </div>
            </div>
        </div>
    )
}

export default ProductDetailes;