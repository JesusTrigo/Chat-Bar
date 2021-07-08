import React from "react";
import axios from "axios";
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";



const Perfiles = () => {

    const [users, setUsers] = useState();

    useEffect(() => {
        const getUsers = async () => {

            const response = await axios("/api/users/find/:id");

            setUsers(response.data.bar.users);
            console.log(response)

        };

        getUsers();
    }, []);

    return (
        <div className="App">
            {
                users.map(user => {
                    return (
                        <Link key={user._id} to={`/bares/perfil/${user._id}`} >
                            <p>{user.username}</p>
                        </Link>
                    )
                })
            }
        </div>
    );
};


export default Perfiles;