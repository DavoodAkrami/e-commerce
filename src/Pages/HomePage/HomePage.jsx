import React from "react";
import "./HomePage.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import links from "../../routes/links.tsx";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { ProductContext } from "../../Context/ProductContext";
import { useContext } from "react";
import { MdArrowForwardIos, MdArrowBackIos  } from "react-icons/md";
import { CartContext } from "../../Context/CartContext.jsx";
import ProductCard from "../../Components/ProductCard/ProductCard";



const HomePage = () => {
    const { addItem, removeItem, getProductQuantity, updateQuantity, cartLoading } = useContext(CartContext);
    const { products, loading: productsLoading } = useContext(ProductContext);
    const [pageCounts, setPageCounts] = useState(0);
    const [activePageNumber, setActivePageNumber] = useState(1);
    const [loadingProducts, setLoadingProducts] = useState(new Set());
    


    const calculateProductLength = () => {
        if (products.length % 9 > 0) {
            return Math.floor(products.length / 9) + 1;
        } else {
            return Math.floor(products.length / 9);
        }
    }

    useEffect (() => {
        setPageCounts(calculateProductLength());
    }, [products]);

    useEffect (() => {
        window.scrollTo(0, 0);
    }, [activePageNumber]);

    const navigate = useNavigate();

    return (
        <div className="root">  
            <div className="productsContainer">
                {productsLoading ? (
                    Array.from({ length: 9 }).map((_, idx) => (
                        <div key={idx} className="productCard">
                            <Skeleton 
                                height={180}
                                width={180}
                                className="skeletonImg"
                                style={{ borderRadius: '16px', marginBottom: '1em', boxShadow: '0 1px 8px rgba(0,0,0,0.10)', background: '#f3f3f3', display: 'block' }} 
                            />
                            <h3 className="title" style={{ margin: '0.5em 0 0.2em 0' }}>
                                <Skeleton width={120} height={20} className="skeletonTitle" />
                            </h3>
                            <div className="price" style={{ marginTop: '0.2em' }}>
                                <Skeleton width={60} height={18} className="skeletonText" />
                            </div>
                        </div>
                    ))
                ) : (
                    products.slice(9 * (activePageNumber - 1), 9 * activePageNumber).map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            addItem={addItem}
                            removeItem={removeItem}
                            getProductQuantity={getProductQuantity}
                            updateQuantity={updateQuantity}
                            loadingProducts={loadingProducts}
                            setLoadingProducts={setLoadingProducts}
                            cartLoading={cartLoading}
                        />
                    ))
                )}
            </div>
            <div className="pageNumbers">
                <button className="reduceActivePageNumber" onClick={() => activePageNumber > 1 ? setActivePageNumber(activePageNumber - 1) : setActivePageNumber(activePageNumber)}><MdArrowBackIos /></button>
                {new Array(pageCounts).fill(0).map((page, index) => (
                    <button key={index} className={activePageNumber === index + 1 ? "activePageNumberButton" : "pageNumberButton"} onClick={() => setActivePageNumber(index + 1)}>{index + 1}</button>
                ))}
                <button className="increasActivePageNumber" onClick={() => activePageNumber < pageCounts ? setActivePageNumber(activePageNumber + 1) : setActivePageNumber(activePageNumber)}><MdArrowForwardIos /></button>
            </div>
        </div>
    )
}

export default HomePage;
