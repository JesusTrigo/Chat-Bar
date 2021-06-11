const express = require("express");
const ChatRoom = require("../models/ChatRoom");
const Message = require("../models/Msgs");
const ChatRoomRouter = require("./ChatRoomRouter");
const MessageRouter = express.Router();

MessageRouter.get("/", async (req, res, next) => {

    let messages = await Message.find({})

    if (!messages) {

        return next({
            success: true,
            status: 400,
            message: "No hay mensajes"
        });
    };

    return res.json({
        success: true,
        messages
    });
});



MessageRouter.get("/find/:id", async (req, res, next) => {
    try {
        const { id } = req.params;

        let message = await Message.findById(id)

        return res.json({
            success: true,
            message
        });
        
    } catch (err) {
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

        let message = new Message({
            user,
            date: new Date(),
            text
        });

        let newMessage = await message.save()

        let chatroom = await ChatRoom.findById(id)

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