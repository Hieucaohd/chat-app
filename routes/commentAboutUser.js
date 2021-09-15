const router = require("express").Router();

const {createCommentAboutUserController} = require("../controllers/commentAboutUser");

router.post("/", createCommentAboutUserController);

module.exports = router;

