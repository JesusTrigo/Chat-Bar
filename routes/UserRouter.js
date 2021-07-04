const express = require("express");
const User = require("../models/User");
const UserRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { checkToken, authRol } = require("../middleware");
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

UserRouter.get("/find/:id", checkToken, async (req, res, next) => {

    const { id } = req.user;
    try {

        let user = await User.findById(id).select(["-password", "-__v"])

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



//Signup

UserRouter.post("/signup", async (req, res, next) => {

    try {
        const { username, password, age, email, gender } = req.body;

        const findUser = await User.findOne({ username });

        var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

        if(!username || !password || !age || !email || !gender) {
            return next({
                status: 400,
                message: `Por favor, rellene todos los campos`
            });
        }
        if (!username) {
            return next({
                status: 400,
                message: `Por favor, rellene el campo: Username`
            });
        };
        if (!password) {
            return next({
                status: 400,
                message: `Por favor, rellene el campo: Password`
            });
        };
        if (!emailRegex.test(email)) {
            return next({
                status: 400,
                message: "Por favor, introduzca un formato de email válido"
            })
        }
        if (!age) {
            return next({
                status: 400,
                message: `Por favor, rellene el campo: Age`
            });
        };
        if (!email) {
            return next({
                status: 400,
                message: `Por favor, rellene el campo: Email`
            });
        };
        if (!gender) {
            return next({
                status: 400,
                message: `Por favor, rellene el campo: Gender`
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
                message: "Password demasiado corta"
            });
        };
        if (age < 18) {
            return next({
                status: 400,
                message: "Edad mínima: 18"
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

        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "24d" });

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



//Eliminar usuario

UserRouter.delete("/remove_user/:id", async (req, res, next) => {

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



// ascender a admin

UserRouter.post('/second_admin', checkToken, authRol, async (req, res, next) => {
    try {

        const { id } = req.user;
        const { user } = req.body;
        const findUser = await User.findById(user);

        if (!user) {
            return next({
                status: 403,
                message: 'Select a member ID'
            });
        }

        if (findUser.id != findUser.id) {
            return next({
                status: 403,
                message: 'Wrong ID'
            });
        }

        if (findUser.rol != 0) {
            return next({
                status: 403,
                message: 'This member is already admin'
            });
        } findUser.rol = 1

        const updatedUser = await findUser.save();
        return res.json({
            success: true,
            member: updatedUser,
            message: 'Member is updated to Admin'
        });

    } catch (err) {
        return next({
            status: 500,
            message: err.message
        });
    }
});


module.exports = UserRouter;

