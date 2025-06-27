import {BrowserRouter } from "react-router-dom";
import ProductProvider from "../Context/ProductContext";
import { UserProvider } from "../Context/UseContext";
import { AuthProvider } from "../Context/AuthContext";


const AppProvider = ({children}) => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <UserProvider>
                    <ProductProvider>
                        {children}
                    </ProductProvider>
                </UserProvider>
            </AuthProvider>
        </BrowserRouter>
    )
}

export default AppProvider;