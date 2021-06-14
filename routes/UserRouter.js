const express = require("express");
const User = require("../models/User");
const UserRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { checkToken } = require("../middleware");
const { JWT_SECRET } = process.env;

UserRouter.get("/", (req, res) => {
    User.find({})

        .exec((err, users) => {
            if (err) {
                return res.json({
                    success: true,
                    message: err
                })
            }
            res.json({
                success: true,
                users
            });
        });
});

UserRouter.get("/find/:id", async (req, res, next) => {
    const { id } = req.params;
    try {

        let user = await User.findById(id).select(["-password", "-__v", "-_id"])

        return res.json({
            success: true,
            user
        });
    }
    catch (err) {
        return next({
            status: 400,
            message: err.message
        });
    }

});



//Crear nuevo usuario

UserRouter.post("/", async (req, res, next) => {
    const { username, password, email, age, gender } = req.body;

    try {
        if (!username || !password || !email || !age || !gender) {
            return next({
                status: 400,
                message: "Por favor, rellene todos los campos"
            });
        };
        if (age < 18) {
            return next({
                succes: false,
                message: "Minimum age required: 18"
            })
        }

        let user = new User({
            username,
            password,
            email,
            age,
            gender
        });

        let newUser = await user.save()

        res.json({
            success: true,
            user: newUser
        });
    }
    catch (err) {
        return next({
            status: 400,
            message: err.message
        });
    }
});



//Signup

UserRouter.post("/signup", async (req, res, next) => {

    try {
        const { username, password, age, email, gender } = req.body;
        
        const findUser = await User.findOne({ username });

        if (!username) {
            return next({
                status: 400,
                message: `Please, fill the field: Username`
            });
        };
        if (!password) {
            return next({
                status: 400,
                message: `Please, fill the field: Password`
            });
        };
        if (!age) {
            return next({
                status: 400,
                message: `Please, fill the field: Age`
            });
        };
        if (!email) {
            return next({
                status: 400,
                message: `Please, fill the field: Email`
            });
        };
        if (!gender) {
            return next({
                status: 400,
                message: `Please, fill the field: Gender`
            });
        };
        if (findUser) {
            return next({
                status: 400,
                message: "Username already in use"
            });
        };
        if (password.length < 6) {
            return next({
                status: 400,
                message: "Password too short"
            });
        };
        if (age < 18) {
            return next({
                status: 400,
                message: "Minimum age required: 18"
            })
        };
        //se podría encriptar aquí la pass, pero mejor en el modelo de user
        let user = new User({
            username,
            password,
            age,
            email,
            gender
        });

        let newUser = await user.save();

        //const token = jwt.sign({ id: newUser._id }, JWT_SECRET, { expiresIn: "24h" });
        //para login sin crear cuenta

        return res.json({
            success: true,
            user: newUser
        });
    }
    catch (err) {
        console.log(err)
        return next({
            status: 500,
            message: err.message
        });
    }

});



//login

UserRouter.post("/login", async (req, res, next) => {

    try {
        
        const { body: { username, password } } = req;

        const user = await User.findOne({ username });

        if (!user) {
            return next({
                status: 403,
                message: "Wrong credentials (Username)"
            });
        }

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return next({
                status: 403, 
                message: "Wrong credentials (pass)"
            });
        }

        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "24h" });

        return res.json({
            success: true,
            token
        });
    } catch (error) {
        return next({
            status: 400,
            message: error.message
        })
    }
});

module.exports = UserRouter;

