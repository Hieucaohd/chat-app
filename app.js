require("dotenv").config();
require("./configs/connectMongoDB").connect();

const express = require("express");
const app = express();

const conversationRoute = require("./routes/conversation");
const messageRoute = require("./routes/message");

app.use(express.json());

app.get("/welcome", (req, res) => {
    res.status(200).send("welcome.");
});

app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);

module.exports = app;
