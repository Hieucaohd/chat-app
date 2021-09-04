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

// tao mot conversation tu request
const createConversationController = async (req, res) => {
    const senderId = req.user.id;
    const receiverId = req.body.receiverId;

    if (senderId && receiverId) {
        try {
            const conversation = await createConversation(senderId, receiverId);
            res.status(200).json(
                conversation
            );
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(401).json({error: "khong co du thong tin"});
    }
};

// lấy các conversation của một userId cho trước từ req
const getConversationController = async (req, res) => {
    userId = req.user.id;

    try {
        const conversation = await Conversation.find({
            members: { $in: [userId] },
            is_hided: false,
        });

        res.status(200).json(conversation);
    } catch (err) {
        res.status(500).json(err);
    }
   
}

module.exports = {createConversationController, getConversationController}