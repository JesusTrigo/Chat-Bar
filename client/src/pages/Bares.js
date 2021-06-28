import React from "react";
import axios from "axios";
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";



const Bares = () => {

    const [bars, setBares] = useState([]);

    useEffect(() => {
        const getBares = async () => {
            const response = await axios("http://localhost:5000/bares");

            setBares(response.data.bars);


        };

        getBares();
    }, []);

    return (
        <div className="App">
            {
                bars.map((bar, i) => {
                    return (
                        <Link key={i} to={`/bares/${bar._id}`} >
                            <p>{bar.name}</p>
                        </Link>
                    )
                })
            }
        </div>
    );
};


export default Bares;