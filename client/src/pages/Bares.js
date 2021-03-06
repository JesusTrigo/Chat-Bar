import React from "react";
import axios from "axios";
import { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";



const Bares = () => {

    const [bars, setBares] = useState();

    let history = useHistory();

    const [successMessage, setSuccessMessage] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const getBares = async () => {
            const response = await axios("/api/bares", {
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
            const response = await axios.put(`/api/bares/add_user/${barId}`, {}, {
                headers: {
                    Authorization: token
                }
            })
            console.log(response)

            history.push(`/bares/${response.data.bar._id}`);

        }
        catch (error) {
            console.log(error.response.data)
            setSuccessMessage(error.response.data.message)
        }
    }

    return (
        <div>
            <div className="baresList">
                {bars &&
                    bars.map((bar) => {
                        return (
                            <button
                                className="btn btn-primary barBtn"
                                key={bar._id}
                                onClick={() => addUser(bar._id)}>
                                <p>{bar.name}</p>
                            </button>
                        )
                    })
                }
            </div>
            <div
                
                style={{ display: successMessage ? "block" : "none" }}>
                {successMessage}
            </div>
        </div>
    );
};


export default Bares;