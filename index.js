const http = require('http');
const express = require('express');
const app = require("./app");

const PORT = process.env.PORT || 5000;

const DEBUG = true;

const server = http.createServer(app);

server.listen(PORT, () => {
	console.log(`server is running on ${PORT}`);
})

module.exports = {DEBUG};


