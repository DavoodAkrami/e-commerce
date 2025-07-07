import React, { useContext } from "react";
import "./ProductCard.css";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import links from "../../routes/links.tsx";
import { AuthContext } from "../../Context/AuthContext.jsx"
import { FaTrashAlt } from "react-icons/fa";
import { ThreeDots } from 'react-loader-spinner';


const ProductCard = ({ product, addItem, removeItem, getProductQuantity, updateQuantity, loadingProducts, setLoadingProducts, cartLoading }) => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const handleAddToCart = (e) => {
        e.stopPropagation();
        if (user) {
            setLoadingProducts(prev => new Set(prev).add(product.id));
            addItem(product.id, 1).finally(() => {
                setLoadingProducts(prev => {
                    const newSet = new Set(prev);
                    newSet.delete(product.id);
                    return newSet;
                });
            });
        } else {
            navigate(links.client.auth);
            return;
        }
    }

    return (
        <div className="productCard" onClick={() => navigate(links.client.product.replace(':id', product.id))}>
            <img src={product.thumbnail} alt={product.title} />
            <h3 className="title">
                {product.title}
            </h3>
            <div className="price">
                price: {getProductQuantity(product.id) < 1 ? product.price : product.price* getProductQuantity(product.id)}$
            </div>
            <div className="addToCart">
                {getProductQuantity(product.id) === 0 ? 
                    <button
                        className="AddToCartButton"
                        title="Add to cart"
                        disabled={loadingProducts.has(product.id)}
                        onClick={(e) => {
                            handleAddToCart(e);
                        }}
                    >
                        {loadingProducts.has(product.id) ? "Adding..." : "Add to cart"}
                    </button> : (
                        <div className="productQuantity">
                            {getProductQuantity(product.id) > 1 ?
                                <CiCircleMinus 
                                className="quantity-btn minus" 
                                onClick={(e) => {
                                        e.stopPropagation();
                                        const currentQty = getProductQuantity(product.id);
                                        if (currentQty > 1) {
                                            updateQuantity(product.id, currentQty - 1);
                                        } else {
                                            removeItem(product.id);
                                        }
                                    }} 
                                /> :
                                <FaTrashAlt     
                                    className="trashIcon" 
                                    onClick={(e) => {
                                            e.stopPropagation();
                                            removeItem(product.id)
                                        }} 
                                />
                            }
                            { cartLoading ?
                                <> 
                                <ThreeDots
                                visible={true}
                                height="52"
                                width="60"
                                color="#1976d2"
                                radius="10"
                                ariaLabel="three-dots-loading"
                                wrapperStyle={{}}
                                wrapperClass=""
                                className="threeDot"
                                />
                                </> :
                                <input 
                                    type="number" 
                                    value={getProductQuantity(product.id)} 
                                    onClick={(e) => e.stopPropagation()}
                                    onChange={(e) => {
                                        const newQty = parseInt(e.target.value) || 0;
                                        updateQuantity(product.id, newQty);
                                    }}
                                    min="1"
                                    className="quantity-input"
                                />
                            }

                            <CiCirclePlus 
                                className="quantity-btn plus" 
                                onClick={(e) => {
                                    e.stopPropagation();
                                    if (product.stock > getProductQuantity(product.id)) {
                                        addItem(product.id, 1);
                                    } else {
                                        alert(`Only ${product.stock} ${product.title} available`);
                                    }
                                }} 
                            />
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default ProductCard;