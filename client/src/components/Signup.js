import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

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
        }
    };
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
                <div>
                    <label>Age</label>
                    <input
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                    />
                </div>
                <div>
                    <label>Email adress</label>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label>Gender</label>
                    <input
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                    />
                </div>

                <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={handleClick}
                >Register
                </button>
            </form>
            <div style={{ display: successMessage ? "block" : "none" }}>
                {successMessage}
            </div>
        </div>
    )




}



export default Signup;