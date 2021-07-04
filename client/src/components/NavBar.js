import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <div className="navbar-sticky">
            <Link className="navbarLink" to="/">Home</Link>
            <Link className="navbarLink" to="/bares">Bares</Link>
        </div>
    );
};



export default NavBar;