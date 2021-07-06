import React from "react";
import axios from "axios";
import { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from "react-router-dom";


const Bar = () => {

    const { id } = useParams();

    const [bar, setBar] = useState();

    let history = useHistory();


    useEffect(() => {
        const getBar = async () => {
            const token = localStorage.getItem("token");
            const response = await axios(`http://localhost:5000/bares/find/${id}`,
                {
                    headers: {
                        "Authorization": token
                    }
                })
            console.log(response)
            setBar(response.data.bar)

        };
        getBar();

    }, [id]);

    const salirBar = async (e) => {

        e.preventDefault();

        const token = localStorage.getItem("token");
        const response = await axios.put(`http://localhost:5000/bares/remove_user/${id}`, {},
            {
                headers: {
                    "Authorization": token
                }
            })
        history.push("/bares")
        console.log(response.data)

    }



    return (
        <div>
            {bar &&
                <div>
                    <p>{bar.name} / {bar.city}</p>
                    <ul>
                        {bar.users.map((user, i) => {
                            return (
                                <li
                                    className="barList"
                                    key={i}>
                                    <Link to={`/perfil/${user._id}/${id}`} >
                                        <p>{user.username}</p>
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </div>}
            <button
                className="btn btn-primary"
                onClick={salirBar}
            >Salir del bar
            </button>
        </div>
    );
};



export default Bar;