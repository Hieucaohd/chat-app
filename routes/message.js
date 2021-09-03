const router = require("express").Router();
const Message = require("../models/Message");
const Conversation = require("../models/Conversation");

router.post("/", async (req, res) => {
    const senderId = req.body.senderId;
    const conversationId = req.body.conversationId;
    const text = req.body.text;

    if (senderId && conversationId && text) {
        try {
            const conversation = await Conversation.findById(conversationId);
            if (conversation.members.find((item) => item === senderId)) {
                const newMessage = new Message({
                    senderId,
                    conversationId,
                    text,
                });

                const savedMessage = await newMessage.save();
                res.status(200).json(savedMessage);
            } else {
                res.status(200).json({
                    error: "ban khong the gui tin nhan trong cuoc tro chuyen nay.",
                });
            }
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(500).json({ error: "request khong hop le." });
    }
});

router.get("/:conversationId", async (req, res) => {
    const conversationId = req.params.conversationId;
    const messages = await Message.find({
        conversationId: conversationId,
    })

    res.status(200).json(messages);
})

module.exports = {messageRoute: router}
