import {BrowserRouter } from "react-router-dom";
import ProductProvider from "../Context/ProductContext";
import { UserProvider } from "../Context/UserContext";
import { AuthProvider } from "../Context/AuthContext";
import { CartProvider } from "../Context/CartContext"


const AppProvider = ({children}) => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <UserProvider>
                    <ProductProvider>
                        <CartProvider>
                            {children}
                        </CartProvider>
                    </ProductProvider>
                </UserProvider>
            </AuthProvider>
        </BrowserRouter>
    )
}

export default AppProvider;