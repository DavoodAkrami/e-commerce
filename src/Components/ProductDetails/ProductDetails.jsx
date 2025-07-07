import React from "react";
import "./ProductDetails.css"
import { CiStar } from "react-icons/ci";
import { BiCategory } from "react-icons/bi";



const ProductDetailes = ({product}) => {

    return (
        <div className="productDetails">
            <div className="title-rate">
                <h1 className="title">
                    {product.title}
                </h1>
                <div className="rate">
                    <span>{product.rating}</span>
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
                    <span className="detialTitle tagTitle">Tags:</span> {product.tags.map((tag, index) => <span key={index} className="tagsSpan">{tag}</span>)}
                </div>
                <div className="description">
                    <span className="detialTitle">Discription:</span> {product.description}
                </div>
            </div>
        </div>
    )
}

export default ProductDetailes;