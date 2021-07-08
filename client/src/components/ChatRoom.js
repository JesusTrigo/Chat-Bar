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
        const response = await axios(`/chat_room/find/${id}`,
            {
                headers: {
                    "Authorization": token
                }
            })
        console.log(response)
        setChat(response.data.chatroom)


    };
//return se ejecuta cuando sale del componente chatRoom
    useEffect(() => {
        let myInterval = setInterval(getChat, 1000);
        return () => {
            clearInterval(myInterval)
        }
    }, [id]);

    return (
        <div>
            {chat &&
                <div className="chatPage">

                    <div className="chatUsers">
                        {chat.users.map((user, i) => {
                            return (
                                <p
                                    className="usersChatroom"
                                    key={i}>{user.username}
                                </p>
                            )
                        })}
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