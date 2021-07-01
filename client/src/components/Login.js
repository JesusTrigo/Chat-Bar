import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const Login = () => {

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
            <form>
                <div>
                    <label>Username</label>
                    <input
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={handleClick}
                >Login
                </button>
                <div style={{ display: successMessage ? "block" : "none" }}>
                    {successMessage}
                </div>
            </form>
        </div>
    )
}



export default Login;