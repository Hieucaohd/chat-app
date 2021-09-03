const http = require('http');
const express = require('express');
const app = require("./app");

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

const DEBUG = true;

let options = {};
if (DEBUG) {
	options = {
		cors: {
			origin: ["http://localhost:3000", 
					 "http://192.168.29.102:3000", 
					 "https://timgiasu.vercel.app", 
					 "http://192.168.1.18:3000"],
			methods: ["GET", "POST"], 
		}
	} 
} else {
	options = {
		cors: {
			origin: ["https://timgiasu.vercel.app"],
			methods: ["GET", "POST"], 
		}
	} 
}

const io = require('socket.io')(server, {
	cors: {
		origin: ["http://localhost:3000", "http://192.168.29.102:3000", "https://timgiasu.vercel.app"],
		methods: ["GET", "POST"], 
	}
})

io.on("connection", (socket) => {
	console.log("A user is connected");

	socket.on("disconnect", () => {
		console.log("A user is disconnect");
	})
})

server.listen(PORT, () => {
	console.log(`server is running on ${PORT}`);
})


