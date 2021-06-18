
const jwt = require("jsonwebtoken");
const User = require("./models/User");

let checkToken = (req, res, next) => {
    let token = req.headers["x-access-token"] || req.headers["authorization"];
    if (token && token.startsWith("Bearer ")) {
        token = token.slice(7, token.legnth);
    }
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Auth token is not supplied"
        });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                success: false,
                message: "Token is not valid"
            });
        }
        req.user = decoded;
        next();
    });
};

const authRol = async (req, res, next) => {
    const { id } = req.user
    const user = await User.findById(id);

    if (user.rol != 1) {
        return next({
            status: 401,
            message: "Not allowed"
        });
    }
    next();
}


const errorHandler = (err, req, res, next) => {
    console.error(err);
    res.status(err.status || 400).send({
        success: false,
        message: err._message || err.message
    });
};


module.exports = {
    errorHandler,
    checkToken,
    authRol
};