const express = require("express");
const { checkToken, authRol } = require("../middleware");
const Bar = require("../models/Bar");
const ChatRoom = require("../models/ChatRoom");
const Msgs = require("../models/Msgs");
const User = require("../models/User");
const ChatRoomRouter = express.Router();

ChatRoomRouter.get("/", checkToken, authRol, async (req, res, next) => {
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


ChatRoomRouter.get("/find/:id", checkToken, async (req, res, next) => {

    try {

        const { id } = req.params;

        const userid = req.user.id;

        let findChat = await ChatRoom.findById(id);

        if (!findChat) {
            return next({
                status: 400,
                message: "La sala de chat no existe"
            });
        }

        let findUser = findChat.users.includes(userid);

        if (!findUser) {
            return next({
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



ChatRoomRouter.post("/new_room", checkToken, async (req, res, next) => {

    try {

        const user1 = req.user.id

        const { user2, bar } = req.body;

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
        // if (!findBar.users.includes(user1) || !findBar.users.includes(user2)) {

        //     return res.json({
        //         success: false,
        //         message: "Usuario no está dentro el bar"
        //     });
        // }
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



ChatRoomRouter.delete("/remove_room/:id", checkToken, async (req, res, next) => {

    try {
        const { id } = req.params;

        const userid = req.user.id

        let findChatRoom = await ChatRoom.findById(id)

        if (!findChatRoom) {
            return next({
                status: 400,
                message: "La sala de chat introducida no existe"
            });
        };
        if (!findChatRoom.users.includes(userid)) {

            return next({
                status: 400,
                message: "El usuario no se encuentra dentro de la sala de chat"
            });
        };
        
        for (let messageId of findChatRoom.messages) {
            let message = await Msgs.findById(messageId);
            await message.deleteOne()
        };

        await findChatRoom.deleteOne()
        res.json ({
            success: true,
            message: "Sala de chat eliminada"
        })

    }

    catch (err) {
        return next({
            status: 400,
            message: err.message
        });

    }

});



module.exports = ChatRoomRouter;