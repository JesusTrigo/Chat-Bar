import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Messages from "./Messages";
import NuevoMensaje from "./NuevoMensaje";

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
                    <div>
                        {chat.users.map((user, i) => {
                            return (
                                <p key={i}>{user.username}</p>
                            )
                        })}
                    </div>
                    <Messages msgs={chat.messages} />
                    <NuevoMensaje />
                </div>}
        </div>
    );
};




export default ChatRoom;