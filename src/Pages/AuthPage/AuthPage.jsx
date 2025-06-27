import React, { useState, useContext, useEffect } from "react";
import  { AuthContext } from "../../Context/AuthContext";
import styles from "./AuthPage.module.css";
import clsx from "clsx";
import { FaSpinner } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import links from "../../routes/links.tsx";


const AuthPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { user, login, loading, error } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate(links.client.home);
        }
    }, [user, navigate])

    const handleSubmit = (e) => {
        e.preventDefault();
        login(username, password);
    };

    return (
        <div className={styles.root}>
            <div className={styles.authPage}>
                <form onSubmit={handleSubmit} className={styles.loginForm}>
                    <h2 className={styles.loginText}>
                        Log In
                    </h2>
                    <input 
                        type="text" 
                        placeholder="Username" 
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        required    
                    />
                    <input 
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required    
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className={clsx(styles.submitButton, loading ? "loadingButton" : "")}
                    >
                        {loading ? <FaSpinner className={styles.spin}/> : "Log-in"}
                    </button>
                    {error && <div className="error">{error}</div>}
                </form>
            </div>
        </div>
    )
}

export default AuthPage;