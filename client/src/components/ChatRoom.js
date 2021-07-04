import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Messages from "./Messages";
import NuevoMensaje from "./NuevoMensaje";

const ChatRoom = () => {

    const { id } = useParams();

    const [chat, setChat] = useState();

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

    useEffect(() => {
        setTimeout(() => {
            getChat();
        }, 1000);

    }, [id]);

    return (
        <div>
            {chat &&
                <div>
                    <div>
                        <ul className="chatUsers">
                            {chat.users.map((user, i) => {
                                return (
                                    <li
                                        className="form-control"
                                        key={i}>{user.username}
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                    <div>
                        <Messages msgs={chat.messages} />
                    </div>
                    <NuevoMensaje updateChat={getChat} />
                </div>}
        </div>
    );
};




export default ChatRoom;