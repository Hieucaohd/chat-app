const router = require("express").Router();

const {createCommentAboutRoomController} = require("../controllers/commentAboutRoom");

router.post("/", createCommentAboutRoomController);

module.exports = router;
