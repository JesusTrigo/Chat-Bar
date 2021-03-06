const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        minLength: 6,
        required: true
    },
    age: {
        type: Number,
        min: 18,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    rol: {
        type: Number,
        default: 0
    },
    gender: String,

    description: String
});

//this = schema

UserSchema.pre("save", function (next) {

    if (!this.isNew || !this.isModified("password")) {
        return next();
    }
    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err);

        bcrypt.hash(this.password, salt, (err, hash) => {
            if (err) return next(err);

            this.password = hash;

            next();
        });
    });
});

module.exports = mongoose.model("User", UserSchema);