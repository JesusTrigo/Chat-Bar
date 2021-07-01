import React from "react";
import axios from "axios";
import { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from "react-router-dom";



const Bares = () => {

    const [bars, setBares] = useState();

    let history = useHistory();

    useEffect(() => {
        const token = localStorage.getItem("token");
        const getBares = async () => {
            const response = await axios(`http://localhost:5000/bares`, {
                headers: {
                    Authorization: token
                }
            });
            console.log(response)
            setBares(response.data.bars);


        };

        getBares();
    }, []);

    const addUser = async (barId) => {

        try {
            const token = localStorage.getItem("token");
            const response = await axios.put(`http://localhost:5000/bares/add_user/${barId}`, {}, {
                headers: {
                    Authorization: token
                }
            })
            console.log(response)

            history.push(`/bares/${response.data.bar._id}`);

        }
        catch (error) {
            console.log(error.response.data)
        }
    }

    return (
        <div className="App">
            {bars &&
                bars.map((bar) => {
                    return (
                        <button
                            className="btn btn-primary"
                            key={bar._id}
                            onClick={() => addUser(bar._id)}>
                            <p>{bar.name}</p>
                        </button>
                    )
                })
            }
        </div>
    );
};


export default Bares;