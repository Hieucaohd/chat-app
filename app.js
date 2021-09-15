require("dotenv").config();
require("./configs/connectMongoDB").connect();

const express = require("express");
const app = express();

const {graphqlHTTP} = require('express-graphql');
const schema = require("./schema/schema");

const auth = require('./middlewares/auth');

const conversationRoute = require("./routes/conversation");
const messageRoute = require("./routes/message");
const commentAboutUserRoute = require("./routes/commentAboutUser");
const commentAboutRoomRoute = require("./routes/commentAboutRoom");

app.use(auth);

app.use("/graphql", graphqlHTTP({
	schema,
	graphiql: true
}));

app.use(express.json());
app.get("/welcome", (req, res) => {
    res.status(200).send("welcome.");
});

app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);
app.use("/commentAboutUser", commentAboutUserRoute);
app.use("/commentAboutRoom", commentAboutRoomRoute);

module.exports = app;
