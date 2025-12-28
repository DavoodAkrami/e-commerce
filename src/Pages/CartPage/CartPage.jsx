import React, { useContext } from "react";
import { CartContext } from "../../Context/CartContext";
import styles from "./CartPage.css";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import links from "../../routes/links.tsx";

const CartPage = () => {
    const { items, totalAmount, totalQuantity, cartLoading, updateQuantity, removeItem, clearCart } = useContext(CartContext);
    const navigate = useNavigate();

    const handleDecrease = (id, current) => {
        updateQuantity(id, Math.max(0, current - 1));
    };

    const handleIncrease = (id, current) => {
        updateQuantity(id, current + 1);
    };

    const handleRemove = (id) => {
        removeItem(id);
    };

    const handleCheckout = () => {
        // placeholder behavior: in a real app we'd go to a checkout flow
        if (totalQuantity === 0) return;
        alert(`Proceeding to checkout. Total: $${totalAmount}`);
    };

    return (
        <div className="cartRoot">
            <h2 className="cartTitle">Your Cart</h2>

            {cartLoading && <div className="loading">Loading...</div>}

            {!cartLoading && items.length === 0 && (
                <div className="empty">
                    <p>Your cart is empty.</p>
                    <button onClick={() => navigate(links.client.home)} className="btn primary">Go shopping</button>
                </div>
            )}

            {!cartLoading && items.length > 0 && (
                <div className="cartContent">
                    <div className="itemsList">
                        {items.map(item => (
                            <div className="cartItem" key={item.id}>
                                <img src={item.image} alt={item.name} className="itemImage"/>
                                <div className="itemInfo">
                                    <div className="itemName">{item.name}</div>
                                    <div className="itemPrice">${item.price}</div>
                                    <div className="quantityControl">
                                        <button className="qtyBtn" onClick={() => handleDecrease(item.id, item.quantity)}>-</button>
                                        <span className="qtyValue">{item.quantity}</span>
                                        <button className="qtyBtn" onClick={() => handleIncrease(item.id, item.quantity)}>+</button>
                                    </div>
                                </div>
                                <div className="itemActions">
                                    <div className="itemSubtotal">${(item.price * item.quantity).toFixed(2)}</div>
                                    <button className={clsx("btn","removeBtn")} onClick={() => handleRemove(item.id)}>Remove</button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <aside className="summary">
                        <h3>Summary</h3>
                        <div className="summaryRow"><span>Items:</span><span>{totalQuantity}</span></div>
                        <div className="summaryRow"><span>Subtotal:</span><span>${totalAmount.toFixed(2)}</span></div>
                        <div className="summaryActions">
                            <button className="btn danger" onClick={clearCart}>Clear Cart</button>
                            <button className="btn primary" onClick={handleCheckout}>Checkout</button>
                        </div>
                    </aside>
                </div>
            )}
        </div>
    )
}

export default CartPage;
