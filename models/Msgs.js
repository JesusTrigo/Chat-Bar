const mongoose = require("mongoose");

const MsgsSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    date: Date,
    text: String
});

module.exports = mongoose.model("Message", MsgsSchema);