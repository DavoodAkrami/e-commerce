import "./PriceBox.css";
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import { FaTrashAlt } from "react-icons/fa";
import { ThreeDots } from 'react-loader-spinner';
import links from "../../routes/links.tsx";
import { CartContext } from "../../Context/CartContext.jsx";

const PriceBox = ({ user, product }) => {
    const [quantity, setQuantity] = useState(1);
    const navigate = useNavigate();
    const { addItem, removeItem, updateQuantity, getProductQuantity, cartLoading } = useContext(CartContext);

    if (!product) return null;

    const inCart = getProductQuantity(product.id) > 0;
    const cartQty = getProductQuantity(product.id);

    const handleAddToCart = (e) => {
        e.stopPropagation();
        if (user) {
            addItem(product.id, quantity);
        } else {
            navigate(links.client.auth);
        }
    };

    const handleQuantityChange = (e) => {
        const newQty = parseInt(e.target.value) || 1;
        if (newQty > 0 && newQty <= product.stock) {
            updateQuantity(product.id, newQty);
        }
    };

    const handleQuantityIncrease = (e) => {
        e.stopPropagation();
        if (cartQty < product.stock) {
            updateQuantity(product.id, cartQty + 1);
        }
    };

    const handleQuantityDecrease = (e) => {
        e.stopPropagation();
        if (cartQty > 1) {
            updateQuantity(product.id, cartQty - 1);
        } else if (cartQty === 1) {
            removeItem(product.id);
        }
    };

    const handleRemove = (e) => {
        e.stopPropagation();
        removeItem(product.id);
    };

    return (
        <div className="PriceBox">
            <div className="price-cart">
                <div className="priceNumber">
                    ${(cartQty > 0 ? cartQty * product.price : product.price).toFixed(2)}
                </div>
                    {cartQty > 0 ? (
                        <div className="quantity">
                            {cartQty > 1 ? (
                                <CiCircleMinus
                                    className="quantity-btn minus"
                                    onClick={handleQuantityDecrease}
                                    disabled={cartLoading}
                                />
                            ) : (
                                <FaTrashAlt
                                    className="trashIcon"
                                    onClick={handleRemove}
                                    disabled={cartLoading}
                                />
                            )}
                            {cartLoading ? (
                                <ThreeDots
                                    visible={true}
                                    height="52"
                                    width="60"
                                    color="#1976d2"
                                    radius="10"
                                    ariaLabel="three-dots-loading"
                                    wrapperStyle={{}}
                                    wrapperClass=""
                                />
                            ) : (
                                <input
                                    type="number"
                                    value={cartQty}
                                    onClick={e => e.stopPropagation()}
                                    onChange={handleQuantityChange}
                                    min="1"
                                    max={product.stock}
                                    className="quantity-input"
                                    disabled={cartLoading}
                                />
                            )}
                            <CiCirclePlus
                                className={`quantity-btn plus ${cartQty >= product.stock ? 'disabled' : ''}`}
                                onClick={handleQuantityIncrease}
                                disabled={cartLoading || cartQty >= product.stock}
                            />
                        </div>
                    ) : null}
                <div className="AddToCart">
                    {cartQty === 0 && (
                        <button
                            className={`add-to-cart-btn${cartLoading ? ' loading' : ''}`}
                            onClick={handleAddToCart}
                            disabled={cartLoading}
                        >
                            {cartLoading ? "Adding..." : "Add To Cart"}
                        </button>
                    )}
                </div>
            </div>
            <div className="product-info-sections">
                <div className="info-box warranty">
                    <div className="info-icon">🛡️</div>
                    <div className="info-content">
                        <h4>Warranty</h4>
                        <p>{product.warrantyInformation || 'Standard warranty included'}</p>
                    </div>
                </div>
                <div className="info-box shipping">
                    <div className="info-icon">🚚</div>
                    <div className="info-content">
                        <h4>Shipping</h4>
                        <p>{product.shippingInformation || 'Free shipping available'}</p>
                    </div>
                </div>
                <div className="info-box availability">
                    <div className="info-icon">📦</div>
                    <div className="info-content">
                        <h4>Availability</h4>
                        <p>{product.availabilityStatus || 'In stock'}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PriceBox;