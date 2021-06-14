const { request } = require("express");
const express = require("express");
const { checkToken } = require("../middleware");
const Bar = require("../models/Bar");
const User = require("../models/User");
const BarRouter = express.Router();



BarRouter.get("/", async (req, res) => {

    let bars = await Bar.find({})

    let reformedBar = bars.map(bar => {
        return {
            _id: bar._id,
            name: bar.name,
            city: bar.city,
            users: bar.users.length
        }
    })

    return res.json({
        success: true,
        bars: reformedBar
    });

});


BarRouter.get("/find/:id", checkToken, async (req, res) => {
    const { id } = req.params;

    let bar = await Bar.findById(id).select(["-__v"]).populate("users", ["username", "age", "gender"])

    return res.json({
        success: true,
        bar
    });


});



BarRouter.post("/", async (req, res, next) => {
    const { name, city } = req.body;
    try {
        if (!name || !city) {
            return next({
                status: 403,
                message: "Por favor, rellene todos los campos"
            });
        };
        let bar = new Bar({
            name,
            city,
            users: []

        });

        let newBar = await bar.save()
        res.json({
            success: true,
            bar: newBar
        });
    }
    catch (err) {
        return next({
            status: 400,
            message: err.message
        });
    }

});

BarRouter.put("/add_user/:id", checkToken, async (req, res, next) => {

    try {

        const { id } = req.params;
        const userid = req.user.id;

        let findUserModel = await User.findById(userid);
        
        let bar = await Bar.findById(id)


        if (bar.users.includes(userid)) {

            return next({
                success: false,
                message: "User already in"
            });
        }
        if (!findUserModel) {
            return next({
                succes: false,
                message: "User does not exist"
            })
        }
        
        bar.users.push(userid);

        let newBar = await bar.save()

        res.json({
            success: true,
            bar: newBar
        });
    } catch (err) {
        return next({
            status: 400,
            message: err.message
        });

    }

});



BarRouter.put("/remove_user/:id", checkToken, async (req, res, next) => {

    try {

        const { id } = req.params;
        const userid = req.user.id;

        let bar = await Bar.findById(id)
        
        if (!bar.users.includes(userid)) {

            return next({
                status: 400,
                message: "El usuario no se encuentra dentro del bar"
            });
        }

        const index = bar.users.findIndex(user => user == userid)
        if (index > -1) {
            bar.users.splice(index, 1);
        }

        let newBar = await bar.save()

        res.json({
            success: true,
            bar: newBar
        });

    } catch (error) {
        return next({
            status: 400,
            message: error.message
        })
    }

});



BarRouter.delete("/remove_bar/:id", async (req, res, next) => {
    const { id } = req.params;

    try {
        let bar = await Bar.findByIdAndDelete(id);

        return res.json({
            success: true,
            message: "Bar eliminado"
        });
    }

    catch (err) {
        return next({
            status: 400,
            message: err.message
        });

    }

});

module.exports = BarRouter;