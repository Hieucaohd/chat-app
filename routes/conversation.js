const router = require("express").Router();
const Conversation = require("../models/Conversation");

// trả về danh sách các conversation có members cho trước
const checkConversation = async (senderId, receiverId) => {
    const conversationList = await Conversation.find({
        members: { $all: [senderId, receiverId] },
    });

    return conversationList;
};

// tạo một conversation
const createConversation = async (senderId, receiverId) => {
    try {
        // kiểm tra xem có tồn tại conversation trước đó không.
        const conversationList = await checkConversation(senderId, receiverId);

        if (conversationList.length !== 0) {
            return conversationList[0];
        } else {
            const newConversation = new Conversation({
                members: [senderId, receiverId],
            });

            const savedConversation = await newConversation.save();
            return savedConversation;
        }
    } catch (err) {
        throw err;
    }
};

// tạo một conversation từ req.
router.post("/", async (req, res) => {
    if (req.body.senderId && req.body.receiverId) {
        try {
            const conversation = await createConversation(req.body.senderId, req.body.receiverId);
            res.status(200).json(
                conversation
            );
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(500).json("khong co du thong tin");
    }
});

// lấy các conversation của một userId cho trước từ req
router.get("/:userId", async (req, res) => {
    console.log(req);
    try {
        const conversation = await Conversation.find({
            members: { $in: [req.params.userId] },
        });
        res.status(200).json(conversation);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = { conversationRoute: router, createConversation, checkConversation };
