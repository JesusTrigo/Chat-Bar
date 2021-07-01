import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ChatRoom = () => {

    const { id } = useParams();

    const [chat, setChat] = useState();

    useEffect(() => {
        const getChat = async () => {
            const token = localStorage.getItem("token");
            const response = await axios(`http://localhost:5000/chat_room/find/${id}`,
                {
                    headers: {
                        "Authorization": token
                    }
                })
            console.log(response)
            setChat(response.data.chatroom)

        };
        getChat();

    }, [id]);

    return (
        <div>
            {chat &&
                <div>
                    <p>{chat._id}</p>
                    <ul>
                        {chat.users.map((sala, i) => {
                            return (
                                <li key={i}>
                                    <p>{sala.username}</p>
                                </li>
                            )
                        })}
                    </ul>
                </div>}
        </div>
    );
};



export default ChatRoom;