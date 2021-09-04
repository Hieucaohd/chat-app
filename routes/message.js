const router = require("express").Router();

const {createMessageController, getMessageController} = require("../controllers/message");

const auth = require("../middlewares/auth");

router.post("/", auth, createMessageController);

router.get("/:conversationId", auth, getMessageController)

module.exports = router
