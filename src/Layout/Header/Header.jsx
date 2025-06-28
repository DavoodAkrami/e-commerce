import "./Header.css";
import React, { useContext } from "react";
import  { AuthContext } from "../../Context/AuthContext";
import { MdShoppingCart, MdLogin } from "react-icons/md";
import NavBar from "../../Components/NavBar/NavBar";
import { useLocation, useNavigate } from "react-router-dom";
import links from "../../routes/links.tsx"
import clsx from "clsx";
import { CartContext } from "../../Context/CartContext.jsx";
import { CgProfile } from "react-icons/cg";



const Header = () => {
    const location = useLocation();
    const { user, logout } = useContext(AuthContext);
    const { totalQuantity } = useContext(CartContext);
    const navigate = useNavigate();

    const Pages = [
            {
                name: "Home",
                path: links.client.home
            },
        ]

    return (
        <div className="root">
            <div className="navigationMenu-Cart">
                <NavBar pages={Pages} />
                <div className="left">
                    <div className={clsx("CartIcon", location.pathname === links.client.cart ? "cartActive" : "")} onClick={() => navigate(links.client.cart)}>
                        <div className="cartNumber">
                            {totalQuantity}
                        </div>
                        <MdShoppingCart size={32} />
                    </div>
                    <div className="profile-login">
                        {user ? (
                            <div className="profile-dropDown">
                                {user.image ? 
                                    <img 
                                        src={user.image} 
                                        alt="Profile" 
                                        className={clsx("profileImg", location.pathname === links.client.profile? "activeProfileImage" : '')}
                                        onClick={() => navigate(links.client.profile)} 
                                    /> :
                                    <CgProfile 
                                        className={clsx("profileIcon", location.pathname === links.client.profile? "activeProfileIcon" : '')} 
                                        onClick={() => navigate(links.client.profile)} 
                                    />
                                }

                                <div className="dropDown">
                                    <ul>
                                        <li onClick={() => navigate(links.client.profile)}>Profile</li>
                                        <li onClick={logout}>Logout</li>
                                    </ul>
                                </div>
                            </div>
                            ) : (
                            <div 
                                className={clsx("login", location.pathname === links.client.auth ? "loginActive" : "")}
                                onClick={() => navigate(links.client.auth)}
                            >
                                <div className="loginIcon">
                                    <MdLogin size={32} />
                                </div>
                                <div className="loginText">
                                    Login
                                </div>
                            </div>
                            )
                        }
                    </div>
                </div>
            </div>
            {Pages.some(page => page.path === location.pathname) && 
            <>
                <hr className="hr" />
                <div className="sectionName">
                        {Pages.map((page, index) => (
                            <h2 key={index}> {page.path === location.pathname ? `${page.name}` : ""} </h2>
                        ))}
                </div>
                <hr className="hr" />
            </>
            }
        </div>
    )
}

export default Header;