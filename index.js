const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const { errorHandler } = require("./middleware");
require("dotenv").config();

// importar router

const BarRouter = require("./routes/BarRouter");

const UserRouter = require("./routes/UserRouter");

const ChatRoomRouter = require("./routes/ChatRoomRouter");

const MessageRouter = require("./routes/MessageRouter");


const { DB_URI, PORT } = process.env

mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => {
        console.log("BD conectada");
    });


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));




app.get("/", (req, res) => {
    return res.send({
        success: true,
        message: "Funciona"
    });
});


app.use("/bares", BarRouter);

app.use("/users", UserRouter);

app.use("/chat_room", ChatRoomRouter);

app.use("/messages", MessageRouter);

app.use(errorHandler);


app.listen(PORT || 5000, () => console.log(`Funcionando en el puerto ${PORT}`));