import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div>
            <Link to={`/login`} >
                <button
                    type="submit"
                    className="btn btn-primary"
                >Iniciar sesión</button>
            </Link>
            <hr />
            <Link to={`/signup`} >
                <button
                    type="submit"
                    className="btn btn-primary"
                >Registrarse</button>
            </Link>
        </div>
    );
};

export default Home;