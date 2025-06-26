import {BrowserRouter } from "react-router-dom";
import ProductProvider from "../Context/ProductContext";
import { UserProvider } from "../Context/UseContext";


const AppProvider = ({children}) => {
    return (
        <BrowserRouter>
            <UserProvider>
                <ProductProvider>
                    {children}
                </ProductProvider>
            </UserProvider>
        </BrowserRouter>
    )
}

export default AppProvider;