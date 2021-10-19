const router = require("express").Router();
const validateInput = require("../middlewares/checkForComment");

const {createCommentAboutUserController} = require("../controllers/commentAboutUser");

router.post("/", validateInput, createCommentAboutUserController);

module.exports = router;

