const mongoose = require("mongoose");

const ChatRoomSchema = new mongoose.Schema({
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    messages:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message"
    }],
    bar: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Bar"
    }
});

module.exports = mongoose.model("ChatRoom", ChatRoomSchema);