import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div>
            <Link to={`/login`} >
                <button>Iniciar sesión</button>
            </Link>
            <hr />
            <Link to={`/signup`} >
                <button>Registrarse</button>
            </Link>
        </div>
    );
};

export default Home;