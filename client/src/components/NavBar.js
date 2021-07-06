import React from "react";
import { Link, useHistory } from "react-router-dom";
import chatbar from "../images/chatbar.png";

const NavBar = () => {

    let history = useHistory();

    const logout = () => {

        localStorage.removeItem("token")

        history.push("/");
    }

    return (
        <div className="navbar-sticky">
            <div className="navImg">
                <img src={chatbar} alt="Imagen" className="navImg" />
            </div>
            <div className="navLinks">
                
                <button className="navbarButton" onClick={logout}>LogOut</button>

                <Link className="navbarLink" to="/bares">Bares</Link>
            </div>
        </div>
    );
};



export default NavBar;