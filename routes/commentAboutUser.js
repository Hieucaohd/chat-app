const router = require("express").Router();
const {checkForUser} = require("../middlewares/checkForComment");

const {createCommentAboutUserController} = require("../controllers/commentAboutUser");

router.post("/", checkForUser, createCommentAboutUserController);

module.exports = router;

