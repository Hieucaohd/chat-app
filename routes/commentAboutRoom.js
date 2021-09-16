const router = require("express").Router();
const {checkForRoom} = require("../middlewares/checkForComment");

const {createCommentAboutRoomController} = require("../controllers/commentAboutRoom");

router.post("/", checkForRoom, createCommentAboutRoomController);

module.exports = router;
