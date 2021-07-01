import axios from "axios";
import React, { useEffect, useState } from "react";

const Messages = ({msgs}) => {


    return (
        <div>
            <h1>Soy el cuadro de mensajes</h1>
            {msgs &&
                msgs.map((msg) => {
                    return (
                        <p key={msg._id}>{msg.user.username}: {msg.text}</p>
                    )
                })
            }
        </div>
    )
}



export default Messages;