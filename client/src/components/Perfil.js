import React from "react";
import axios from "axios";
import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";



const Perfil = () => {

    const { id, barid } = useParams();

    //  const { chatId } = useParams();

    const [user, setUser] = useState();

    useEffect(() => {
        const getUser = async () => {
            const response = await axios(`http://localhost:5000/users/find/${id}`,
                {
                    headers: {
                        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwY2I2OWVmN2FiMjgwMmM2ODIyNjExZSIsImlhdCI6MTYyNDY1NDY5OSwiZXhwIjoxNjI2NzI4Mjk5fQ.cxqYaxX61j03dq6oCoLj6C7pBi-ts9qsf9uJLHbv20c"
                    }
                })
            console.log(response)
            setUser(response.data.user)

        };
        getUser();

    }, [id]);


    const chatRoom = async () => {
        console.log("funciona")

        const body = {
            user2: id,
            bar: barid
        }
        const headers = {
            Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZDVlY2I1NWVlYWY2Mzg5MDBkZGNlZSIsImlhdCI6MTYyNDk3NTYzMiwiZXhwIjoxNjI3MDQ5MjMyfQ.hNrZ-gNRuKjEjekTEwFmG9bnhxUcKNz4F06ORQqEl2U"
        };
        const response = await axios.post(`http://localhost:5000/chat_room/new_room`, body, { headers })

        console.log(response)

    }
    // "el usuario no esta dentro del bar" = mostrarlo como error en frontend
    return (
        <div>

            {user &&
                <div>

                    <p>{user.username}</p>
                    <p>{user.age}</p>
                    <p>{user.gender}</p>


                    <button onClick={chatRoom}>
                        <p>Crear sala de chat</p>
                    </button>

                </div>}

        </div>
    );
};



export default Perfil;
