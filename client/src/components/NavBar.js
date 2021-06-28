import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <div>
            <nav>
                <ul>
                    <li>
                        <Link to="/home">Home</Link>
                    </li>
                    <li>
                        <Link to="/bares">Bares</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};



export default NavBar;