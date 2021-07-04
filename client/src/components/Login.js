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
            const response = await axios.post("http://localhost:5000/users/login", body)

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
        }
    }

    return (
        <div className="App">
            <img src={chatbar} alt="Imagen" />
            <form>
                <div className="login-inputs-btn">
                    <div className="login-inputs">
                        <div className="login-user-pass">
                            <input
                                className="form-control"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="login-user-pass">
                            <input
                                className="form-control"
                                placeholder="Password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="login-btn">
                        <button
                            type="submit"
                            className="btn btn-primary form-control"
                            onClick={handleClick}
                        >Login
                        </button>
                    </div>
                </div>
                <div style={{ display: successMessage ? "block" : "none" }}>
                    {successMessage}
                </div>
            </form>
        </div>
    )
}



export default Login;