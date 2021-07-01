import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Messages from "./Messages";

const NuevoMensaje = () => {

    const { id } = useParams();
    const [nuevoMsg, setnuevoMsg] = useState("");



    const handleClick = async (e) => {
        e.preventDefault();
        try {

            const token = localStorage.getItem("token");
            const body = {
                text: nuevoMsg
            }
            const response = await axios.post(`http://localhost:5000/messages/add_message/${id}`, body,
                {
                    headers: {
                        "Authorization": token
                    }
                })

            console.log(response.data)


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
                onClick={handleClick}
                className="btn btn-primary form-control">
                Enviar
            </button>
        </div>
    )

}



export default NuevoMensaje;