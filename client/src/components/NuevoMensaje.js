import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router-dom";

const NuevoMensaje = ({ updateChat }) => {

    const { id } = useParams();
    const [nuevoMsg, setnuevoMsg] = useState("");



    const handleClick = async (e) => {
        e.preventDefault();
        try {

            const token = localStorage.getItem("token");
            const body = {
                text: nuevoMsg
            }
            const response = await axios.post(`/api/messages/add_message/${id}`, body,
                {
                    headers: {
                        "Authorization": token
                    }
                })

            console.log(response.data)

            updateChat();
        }
        catch (error) {
            console.log(error.response.data)
        }
    }
    return (
        <div>
            <input
                className="form-control"
                placeholder="Escriba aquí"
                value={nuevoMsg}
                onChange={(e) => setnuevoMsg(e.target.value)}
            />
            <button
                className="buttonColor btn btn-primary"
                onClick={handleClick}
            >
                Enviar
            </button>
        </div>
    )

}



export default NuevoMensaje;