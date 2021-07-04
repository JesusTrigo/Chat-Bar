import React from "react";

const Messages = ({ msgs }) => {


    return (
        <div className="msgsBox">

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