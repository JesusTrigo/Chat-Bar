import React from "react";
import { Link } from "react-router-dom";
import chatbar from "../images/chatbar.png";

const Home = () => {
    return (
        <div className="home">
            <img src={chatbar} alt="Imagen" className="homeImg" />
            <div className="homeButtons">
                <Link to={`/login`} >
                    <button

                        type="submit"
                        className="btn btn-primary buttonColor"
                    >Iniciar sesión</button>
                </Link>
                <hr className="hrHome" />
                <Link to={`/signup`} >
                    <button
                        type="submit"
                        className="btn btn-primary buttonColor"
                    >Registrarse</button>
                </Link>
            </div>
        </div>
    );
};

export default Home;