import React from "react";
import axios from "axios";
import { useEffect, useState } from 'react';
import { useHistory, useParams } from "react-router-dom";


const Perfil = () => {

    const { id, barid } = useParams();

    //  const { chatId } = useParams();

    const [user, setUser] = useState();

    let history = useHistory();

    useEffect(() => {
        const getUser = async () => {
            const token = localStorage.getItem("token");
            const response = await axios(`/api/users/find/${id}`,
                {
                    headers: {
                        "Authorization": token
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
            // chatid: chatId
        }
        const token = localStorage.getItem("token");
        const headers = {
            "Authorization": token
        };
        const response = await axios.post("/api/chat_room/new_room", body, { headers })
        setTimeout(() => {
            history.push(`/chat/${response.data.chatroom._id}`);
        }, 2000);
        console.log(response)
        
    }
    // "el usuario no esta dentro del bar" = mostrarlo como error en frontend

    
    return (
        <div>

            {user &&
                <div>

                    <p><span className="nombresChat">Nombre</span> <br /> {user.username}</p>
                    <p><span className="nombresChat">Edad</span> <br /> {user.age}</p>
                    <p><span className="nombresChat">Género</span> <br /> {user.gender}</p>

                    
                        <button
                            type="submit"
                            className="btn btn-primary crearChatBtn"
                            onClick={chatRoom}>
                            <p>Crear sala de chat</p>
                        </button>
                   

                </div>}

        </div>
    );
};



export default Perfil;
