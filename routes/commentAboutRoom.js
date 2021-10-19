const router = require("express").Router();
const validateInput = require("../middlewares/checkForComment");

const {createCommentAboutRoomController} = require("../controllers/commentAboutRoom");

router.post("/", validateInput, createCommentAboutRoomController);

module.exports = router;
