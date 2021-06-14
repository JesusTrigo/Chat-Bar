const express = require("express");
const Bar = require("../models/Bar");
const ChatRoom = require("../models/ChatRoom");
const User = require("../models/User");
const ChatRoomRouter = express.Router();

ChatRoomRouter.get("/", async (req, res, next) => {
    try {

        let chatroom = await ChatRoom.find({})

        if (!chatroom) {
            return res.json({
                success: false,
                message: "Crear sala primero"
            });
        }
        return res.json({
            success: true,
            chatroom
        });

    } catch (error) {
        return next({
            status: 400,
            message: error.message
        });
    }

});


ChatRoomRouter.get("/find/:id", async (req, res, next) => {

    try {

        const { id } = req.params;

        const { userid } = req.body;

        let findChat = await ChatRoom.findById(id);

        if (!findChat) {
            return next ({
                status: 400,
                message: "La sala de chat no existe"
            });
        }

        let findUser = findChat.users.includes(userid);

        if (!findUser) {
            return next ({
                status: 400,
                message: "El usuario no está en la sala de chat"
            });
        }

        ChatRoom.findById(id).select(["-_id", "-__v"]).populate("users", ["username", "age", "gender"])
            .exec((err, chatroom) => {
                res.json({
                    success: true,
                    chatroom
                });
            });

    } catch (error) {
        return next({
            status: 400,
            message: error.message
        });
    }
});



ChatRoomRouter.post("/new_room", async (req, res, next) => {
    const { user1, user2, bar } = req.body;

    try {

        if (!user1 || !user2 || !bar) {
            return res.json({
                success: false,
                message: "Por favor, rellene todos los campos"
            });
        };
        if (user1 === user2) {
            return res.json({
                success: false,
                message: "No puede haber dos usuarios iguales"
            });
        };

        let findBar = await Bar.findById(bar)

        if (!findBar) {

            return res.json({
                success: false,
                message: "Introduzca un bar válido"
            });
        }
        if (!findBar.users.includes(user1) || !findBar.users.includes(user2)) {

            return res.json({
                success: false,
                message: "Usuario no está dentro el bar"
            });
        }
        let chatroom = new ChatRoom({
            users: [user1, user2],
            messages: [],
            bar
        });

        let newChatRoom = await chatroom.save()

        return res.json({
            success: true,
            chatroom: newChatRoom
        });

    } catch (err) {
        
        return next({
            status: 400,
            message: err.message
        });
    }
});



module.exports = ChatRoomRouter;