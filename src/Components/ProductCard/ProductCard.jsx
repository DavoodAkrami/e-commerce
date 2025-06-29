import React, { useContext } from "react";
import "./ProductCard.css";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import links from "../../routes/links.tsx";
import { AuthContext } from "../../Context/AuthContext.jsx"


const ProductCard = ({ product, addItem, removeItem, getProductQuantity, updateQuantity, loadingProducts, setLoadingProducts }) => {
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
                            handleAddToCart(e)
                        }}
                    >
                        {loadingProducts.has(product.id) ? "Adding..." : "Add to cart"}
                    </button> : (
                        <div className="productQuantity">
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
                            />
                            <input 
                                type="number" 
                                value={getProductQuantity(product.id)} 
                                onClick={(e) => e.stopPropagation()}
                                onChange={(e) => {
                                    const newQty = parseInt(e.target.value) || 0;
                                    if (newQty > 0) {
                                        updateQuantity(product.id, newQty);
                                    } else if (newQty === 0) {
                                        removeItem(product.id);
                                    }
                                }}
                                min="1"
                                className="quantity-input"
                            />
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