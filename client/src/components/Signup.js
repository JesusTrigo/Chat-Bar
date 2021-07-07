import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import chatbar from "../images/chatbar.png";
const Signup = () => {

    let history = useHistory();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [age, setAge] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("");
    const [successMessage, setSuccessMessage] = useState(null);

    const handleClick = async (e) => {
        try {
            e.preventDefault();

            const body = {
                username,
                password,
                age,
                email,
                gender
            }


            const response = await axios.post("http://localhost:5000/users/signup", body)
            console.log(response)
            setSuccessMessage("Usuario creado correctamente")

            setTimeout(() => {
                history.push("/login");
            }, 2000);
        }
        catch (error) {
            console.log(error.response.data)
            setSuccessMessage(error.response.data.message)
        }
    };
    return (
        <div className="App">
            <input
                placeholder="Username"
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <hr />
            <input
                placeholder="Password"
                className="form-control"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <hr />
            <input
                placeholder="Age"
                className="form-control"
                value={age}
                onChange={(e) => setAge(e.target.value)}
            />
            <hr />
            <input
                placeholder="Email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <hr />
            <input
                placeholder="Gender"
                className="form-control"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
            />
            <hr />
            <button
                type="submit"
                className="btn btn-primary buttonColor"
                onClick={handleClick}
            >Registro
            </button>
            <div
                className="alertBox"
                style={{ display: successMessage ? "block" : "none" }}>
                {successMessage}
            </div>
        </div>
    );

};



export default Signup;