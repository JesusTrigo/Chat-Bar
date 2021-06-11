const mongoose = require("mongoose");
const User = require("./User");
const BarSchema = new mongoose.Schema({

    name: String,
    city: String,
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }]//max length, 2
});

module.exports = mongoose.model("Bar", BarSchema);