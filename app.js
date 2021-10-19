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

app.use("/conversations", conversationRoute);
app.use("/messages", messageRoute);
app.use("/commentAboutUser", commentAboutUserRoute);
app.use("/commentAboutRoom", commentAboutRoomRoute);

module.exports = app;
