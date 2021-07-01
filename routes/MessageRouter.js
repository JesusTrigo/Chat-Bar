const express = require("express");
const { checkToken } = require("../middleware");
const ChatRoom = require("../models/ChatRoom");
const Msgs = require("../models/Msgs");
const Message = require("../models/Msgs");
const User = require("../models/User");
const ChatRoomRouter = require("./ChatRoomRouter");
const MessageRouter = express.Router();

MessageRouter.get("/", async (req, res, next) => {
    try {

        let messages = await Message.find({})

        if (!messages) {

            return next({
                success: false,
                status: 400,
                message: "No hay mensajes"
            });
        };

        return res.json({
            success: true,
            messages
        });

    } catch (error) {
        return next({
            status: 400,
            message: error.message
        });
    };

});



MessageRouter.get("/find/:id", checkToken, async (req, res, next) => {
    try {

        const { id } = req.params;

        const userid = req.user.id;

        let findChat = await ChatRoom.findById(id);

        let index = await findChat.messages.findIndex(msg => msg === id)

        if (index > -1) {
            findChat.messages.splice(index, 999);
        }

        if (!findChat) {
            return res.json({
                succes: false,
                message: "Sala de chat no encontrada"
            });
        };

        let newMsgs = await findChat.save()

        res.json({
            success: true,
            findChat: newMsgs
        });

    } catch (err) {
        console.log(err)
        return next({
            status: 400,
            message: err.message
        });
    };
});



//cambiado de put

MessageRouter.post("/add_message/:id", checkToken, async (req, res, next) => {

    try {
        const { id } = req.params; //id del chatroom

        const { text } = req.body;

        const userid = req.user.id;

        if (!text) {
            return res.json({
                success: false,
                message: "Por favor, escriba algo"
            });
        };

        let chatroom = await ChatRoom.findById(id)

        if (!chatroom) {
            return next({
                status: 400,
                message: "ChatRoom no existe"
            });
        }

        let findUser = await chatroom.users.includes(userid)

        if (!findUser) {
            return next({
                status: 400,
                message: "El usuario no está dentro de la sala de chat"
            });
        };

        let message = new Message({
            user: userid,
            date: new Date(),
            text
        });

        let newMessage = await message.save()

        chatroom.messages.push(newMessage._id)

        let newChatRoom = await chatroom.save()

        return res.json({
            success: true,
            chatRoom: newChatRoom
        });

    } catch (err) {
        return next({
            status: 400,
            message: err.message
        });
    }
});



MessageRouter.delete("/remove_message/:id", checkToken, async (req, res, next) => {

    try {
        const { id } = req.params;

        const userid = req.user.id;

        let findMessage = await Msgs.findById(id)

        if (!findMessage) {
            return next({
                status: 400,
                message: "Mensaje no encontrado"
            })
        }
        if (findMessage) {
            return findMessage.deleteOne(),
                res.json({
                    message: "Mensaje eliminado",

                });
        };
    }

    catch (err) {
        return next({
            status: 400,
            message: err.message
        });

    }

});

module.exports = MessageRouter;