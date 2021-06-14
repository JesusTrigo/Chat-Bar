const express = require("express");
const ChatRoom = require("../models/ChatRoom");
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



MessageRouter.get("/find/:id", async (req, res, next) => {
    try {
        

        const { userid } = req.body;

        let findUser = await ChatRoom.users.findById(userid)

        if (findUser) {
            return res.json({
                success: true,
                message
            });
        }



    } catch (err) {
        console.log(err)
        return next({
            status: 400,
            message: err.message
        })
    }
});



MessageRouter.put("/add_message/:id", async (req, res, next) => {

    try {
        const { id } = req.params; //id del chatroom

        const { user, text } = req.body;

        if (!user || !text) {
            return res.json({
                success: false,
                message: "Por favor, rellene todos los campos"
            });
        };

        let chatroom = await ChatRoom.findById(id)

        if (!chatroom) {
            return next({
                status: 400,
                message: "ChatRoom no existe"
            });
        }

        let findUser = await chatroom.users.includes(user)

        if (!findUser) {
            return next({
                status: 400,
                message: "El usuario no está dentro de la sala de chat"
            });
        };

        let message = new Message({
            user,
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

module.exports = MessageRouter;