import React, { createContext, useEffect, useState} from "react";

export const UserContext = createContext();

export const UserProvider = ({children}) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const res = await fetch('https://dummyjson.com/users');
            const data = await res.json();
            setUsers(data.users); 
        } catch (error) {
            console.error("Error", error);
        }
        setLoading(false);
    };
    
    useEffect(() => {
        fetchUsers();
    }, [])

    return(
        <UserContext.Provider value={ users, loading}>
            {children}
        </UserContext.Provider>
    )
}