import "./ClientProfilePage.css"
import { useContext } from "react";
import { AuthContext } from "../../../Context/AuthContext";
import links from "../../../routes/links.tsx";
import { useNavigate } from "react-router-dom";

const ClientProfilePage = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    if (!user) {
        return (
            <div className="profileRoot">
                <h2>Profile</h2>
                <div className="notLogged">You are not logged in.</div>
                <div className="profileActions">
                    <button className="btn primary" onClick={() => navigate(links.client.auth)}>Log in</button>
                </div>
            </div>
        )
    }

    return (
        <div className="profileRoot">
            <h2 className="profileTitle">Profile</h2>
            <div className="profileCard">
                {user.image && <img src={user.image} alt="avatar" className="avatar" />}
                <div className="profileInfo">
                    <div className="name">{user.firstName} {user.lastName}</div>
                    <div className="username">@{user.username}</div>
                    <div className="email">{user.email}</div>
                    {user.phone && <div className="phone">{user.phone}</div>}
                    {user.address && (
                        <div className="address">{user.address.address}, {user.address.city}</div>
                    )}
                    <div className="profileActions">
                        <button className="btn" onClick={() => navigate(links.client.cart)}>View Cart</button>
                        <button className="btn danger" onClick={logout}>Logout</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ClientProfilePage;