import React, { useReducer, useEffect, createContext} from "react";
import Cookies from "js-cookie"


export const AuthContext = createContext();

const initialState = {
    user: null,
    loading: false,
    error: null
}

const authReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN_START":
            return { ...state, loading: true, error: null };
        case "LOGIN_SUCCESS":
            return { ...state, loading: false, user: action.payload, error: null };
        case "LOGIN_ERROR":
            return { ...state, loading: false, user: null, error: action.payload };
        case "LOGOUT":
            return { ...state, user: null, error:null }
        default: 
            return state;
    }
}


export const AuthProvider = ({ children }) => {
    const [ state, dispatch ] = useReducer(authReducer, initialState);

    const login = async (username, password) => {
        dispatch({ type: "LOGIN_START" });
        try {
            const res = await fetch('https://dummyjson.com/auth/login',{
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });
            const data = await res.json();
            if (res.ok) {
                Cookies.set("token", data.token, { expires: 1000000000000000 });
                localStorage.setItem("user", JSON.stringify(data));
                dispatch({ type: "LOGIN_SUCCESS", payload: data });
            } else {
                dispatch({ type: "LOGIN_ERROR", payload: data.message || "Login failed" });
            }
        } catch (error) {
            dispatch({ type: "LOGIN_ERROR", payload: error.message});
        };
    };

    const logout = () => {
        Cookies.remove("token");
        localStorage.removeItem("user");
        dispatch({ type: "LOGOUT" });
    };


    useEffect(() => {
        const token = Cookies.get("token");
        const storedUser = localStorage.getItem("user");
        if ( token && !state.user) {
            dispatch({ type: "LOGIN_SUCCESS", payload: JSON.parse(storedUser) });
        }
    }, []);

    return (
        <AuthContext.Provider value={{
            user: state.user,
            loading: state.loading,
            error: state.error,
            login,
            logout,
        }}> 
            {children}
        </AuthContext.Provider>
    );
};