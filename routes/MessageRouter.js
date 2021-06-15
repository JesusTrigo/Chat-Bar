const express = require("express");
const { checkToken } = require("../middleware");
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



MessageRouter.put("/add_message/:id", checkToken, async (req, res, next) => {

    try {
        const { id } = req.params; //id del chatroom

        const { text } = req.body;

        const userid = req.user.id;

        if (!userid || !text) {
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

        let findUser = await chatroom.users.includes(userid)

        if (!findUser) {
            return next({
                status: 400,
                message: "El usuario no está dentro de la sala de chat"
            });
        };

        let message = new Message({
            user : userid,
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



MessageRouter.delete("/remove_message/:id", async (req, res, next) => {

    try {
        const { id } = req.params;

        let findBar = await Bar.findById(id)

        if (!findBar) {
            return next({
                status: 400,
                message: "El bar introducido no existe"
            })
        }
        if (findBar) {
            return findBar.deleteOne(),
            res.json({
                message: "Bar eliminado",

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