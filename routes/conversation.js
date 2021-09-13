const router = require("express").Router();
const auth = require("../middlewares/auth");

const {createConversationController, getConversationController} = require("../controllers/conversation");

// tạo một conversation từ req.
router.post("/", auth, createConversationController);

// lấy các conversation của một userId cho trước từ req
router.get("/", auth, getConversationController);

module.exports = router;
