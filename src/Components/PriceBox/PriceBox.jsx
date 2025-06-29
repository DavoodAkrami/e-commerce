import "./PriceBox.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import links from "../../routes/links.tsx";


const PriceBox = ({user, product, addItem, removeItem, updateQuantity}) => {
    const [quantity, setQuantity] = useState(1);
    const [loadingProducts, setLoadingProducts] = useState(new Set());
    const [showSuccess, setShowSuccess] = useState(false);
    const navigate = useNavigate();
    
    
    const handleAddToCart = (e) => {
        e.stopPropagation();
        if (user) {
            setLoadingProducts(prev => new Set(prev).add(product.id));
            addItem(product.id, quantity).finally(() => {
                setLoadingProducts(prev => {
                    const newSet = new Set(prev);
                    newSet.delete(product.id);
                    return newSet;
                });
                setShowSuccess(true);
                setTimeout(() => setQuantity(1), 3000);
                setTimeout(() => setShowSuccess(false), 3000);
            });
        } else {
            navigate(links.client.auth);
            return;
        }
    }

    const handleQuantityChange = (e) => {
        const newQty = parseInt(e.target.value) || 1;
        if (newQty > 0 && newQty <= product.stock) {
            setQuantity(newQty);
        }
    };

    const handleQuantityIncrease = () => {
        if (quantity < product.stock) {
            setQuantity(quantity + 1);
        }
    };

    const handleQuantityDecrease = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    if (!product) {
        return null;
    }

    return (
        <div className="PriceBox">
            <div className="price-cart">
                <div className="priceNumber">
                    ${(quantity * product.price).toFixed(2)}
                </div>
                <div className="quantity">
                    <CiCircleMinus 
                        className={`quantity-btn minus ${quantity <= 1 ? 'disabled' : ''}`}
                        onClick={handleQuantityDecrease} 
                    /> 
                    <input 
                        type="number" 
                        value={quantity} 
                        onChange={handleQuantityChange}
                        min="1"
                        max={product.stock}
                        className="quantity-input"
                    />
                    <CiCirclePlus 
                        className={`quantity-btn plus ${quantity >= product.stock ? 'disabled' : ''}`}
                        onClick={handleQuantityIncrease} 
                    /> 
                </div>
                <div className="AddToCart">
                    <button
                        className={`add-to-cart-btn ${loadingProducts.has(product.id) ? 'loading' : ''}`}
                        onClick={handleAddToCart}
                        disabled={loadingProducts.has(product.id)}
                    >
                        {loadingProducts.has(product.id) ? "Adding..." : "Add To Cart"}
                    </button>
                </div>
                {showSuccess && (
                    <div className="success-message">
                        ✓ Added {quantity} {quantity === 1 ? 'item' : 'items'} to cart!
                    </div>
                )}
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
    )
}

export default PriceBox;