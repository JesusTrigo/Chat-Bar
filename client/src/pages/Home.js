import React from "react";
import { Link } from "react-router-dom";
import chatbar from "../images/chatbar.png";

const Home = () => {
    return (
        <div>
            <img src={chatbar} alt="Imagen" />
            <hr />
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