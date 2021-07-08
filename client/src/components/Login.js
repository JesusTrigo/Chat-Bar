import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import chatbar from "../images/chatbar.png";

const Login = ({ getUser }) => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [successMessage, setSuccessMessage] = useState(null);

    let history = useHistory();

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            const body = {
                username,
                password
            }
            const response = await axios.post("/api/users/login", body)

            console.log(response.data)
            setSuccessMessage("Login correcto")
            localStorage.setItem("token", response.data.token)
            getUser();
            setTimeout(() => {
                history.push("/bares");
            }, 2000);
        }
        catch (error) {
            console.log(error.response.data)
            setSuccessMessage(error.response.data.message)
        };
    };

    return (
        <div className="home">
            <img src={chatbar} alt="Imagen" className="loginImg" />
            <div className="homeButtons">
                <input
                    className="form-control"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <hr className="loginHr" />
                <input
                    className="form-control"
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <hr className="loginHr" />
                <button
                    type="submit"
                    className="btn btn-primary buttonColor"
                    onClick={handleClick}
                >Login
                </button>
                <div style={{ display: successMessage ? "block" : "none" }}>
                    {successMessage}
                </div>
            </div>
        </div>
    );
};



export default Login;