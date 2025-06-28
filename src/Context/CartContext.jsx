import React, { createContext, useReducer, useEffect, useContext} from "react";
import { AuthContext } from "./AuthContext";



export const CartContext = createContext();

const initialState = {
    items: [],
    totalQuantity: 0,
    totalAmount: 0,
    error: null,
    loading: false,
}   


const CartReducer = (state, action) => {
    switch (action.type) {
        case "ADD_ITEM":
            const existingItem = state.items.find(item => item.id === action.payload.id);
            if (existingItem) {
                const updatedItems = state.items.map(item => 
                    item.id === action.payload.id
                        ? { ...item, quantity: item.quantity + action.payload.quantity } 
                        : item
                );
                return {
                    ...state,
                    items: updatedItems,
                    totalQuantity: state.totalQuantity + action.payload.quantity,
                    totalAmount: state.totalAmount + (action.payload.price * action.payload.quantity),
                };
            } else {
                return {
                    ...state,
                    items: [...state.items, action.payload],
                    totalQuantity: state.totalQuantity + action.payload.quantity,
                    totalAmount: state.totalAmount + (action.payload.price * action.payload.quantity),
                };
            }
        case "REMOVE_ITEM":
            const itemToRemove = state.items.find(item => item.id === action.payload.id);
            const updatedItems = state.items.filter(item => item.id !== action.payload.id);

            return {
                ...state,
                items: updatedItems,
                totalQuantity: state.totalQuantity - itemToRemove.quantity,
                totalAmount: state.totalAmount - (itemToRemove.price * itemToRemove.quantity),
            };
            case "UPDATE_QUANTITY":
                const updatedItemsForQuantity = state.items.map(item =>
                    item.id === action.payload.id
                        ? { ...item, quantity: action.payload.quantity }
                        : item
                );
                
                const newTotalQuantity = updatedItemsForQuantity.reduce((total, item) => total + item.quantity, 0);
                const newTotalAmount = updatedItemsForQuantity.reduce((total, item) => total + (item.price * item.quantity), 0);
                
                return {
                    ...state,
                    items: updatedItemsForQuantity,
                    totalQuantity: newTotalQuantity,
                    totalAmount: newTotalAmount,
                    lastUpdate: new Date().toISOString()
                };
        case "CLEAR_CART":
            return {
                ...state,
                items: [],
                totalQuantity: 0,
                totalAmount: 0
            };
        case "SET_LOADING": 
            return {
                ...state,
                loading: action.payload
            };
        case "SET_ERROR":
            return {
                ...state,
                error: action.payload,
                loading: false
            };
        case "CLEAR_ERROR": 
            return {
                ...state,
                error: null
            };
        case "LOAD_CART":
            return {
                ...state,
                ...action.payload,
                loading: false,
                error: null
            };
        default:
            return state;
    };
};




export const CartProvider = ({ children }) => {
    const [ state, dispatch ] = useReducer( CartReducer, initialState);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            try {
                const cartData = JSON.parse(savedCart);

                if (cartData.items && cartData.items.length > 0) {
                    dispatch({ type: 'LOAD_CART', payload: cartData });
                }
            } catch (error) {
                console.error('Error loading cart from localStorage:', error);
            }
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(state));
    }, [state]);

    const addItem = async (id, quantity) => {
        dispatch({ type: 'SET_LOADING', payload: true });
        try{
            const res = await fetch('https://dummyjson.com/carts/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: user.id,
                    products: [
                        {
                            id: id,
                            quantity: quantity
                        }
                    ]
                })
            });
            if (res.ok) {
                const data = await res.json();

                dispatch({ 
                    type: 'ADD_ITEM', 
                    payload: {
                        id: id,
                        name: data.products[0].title, 
                        price: data.products[0].price,
                        image: data.products[0].thumbnail,
                        quantity: quantity
                    }
                });

                dispatch({ type: 'CLEAR_ERROR' });
            } else {
                throw new Error('Failed to add item');
            }    
        } catch (error) {
            dispatch({ type: 'SET_ERROR', payload: error.message });
        } finally {
            dispatch({ type: 'SET_LOADING', payload: false });
        }        
    };

    const removeItem = (id) => {
        dispatch({ type: 'REMOVE_ITEM', payload: { id } });
    };

    const updateQuantity = (id, quantity) => {
        if (quantity <= 0) {
            removeItem(id);
        } else {
            dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
        }
    };

    const clearCart = () => {
        dispatch({ type: 'CLEAR_CART' });
    };

    const clearError = () => {
        dispatch({ type: 'CLEAR_ERROR' });
    };

    const getProductQuantity = (productId) => {
        const product = state.items.find(item => item.id === productId);
        return product ? product.quantity : 0;
    };

    const value = {
        ...state,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        clearError,
        getProductQuantity
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};


