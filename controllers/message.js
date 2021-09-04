const Message = require("../models/Message");
const Conversation = require("../models/Conversation");

// gui tin nhan
const createMessageController = async (req, res) => {
    const senderId = req.user.id;
    const conversationId = req.body.conversationId;
    const text = req.body.text;

    if (senderId && conversationId && text) {
        try {
            const conversation = await Conversation.findById(conversationId);
            if (conversation.members.find((memberId) => memberId === senderId)) {
                const newMessage = new Message({
                    senderId,
                    conversationId,
                    text,
                });

                const savedMessage = await newMessage.save();
                res.status(200).json(savedMessage);
            } else {
                res.status(403).json({
                    error: "ban khong the gui tin nhan trong cuoc tro chuyen nay.",
                });
            }
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(401).json({ error: "request khong hop le." });
    }
}

// lay tat ca tin nhan tu mot conversationId
const getMessageController = async (req, res) => {
    const conversationId = req.params.conversationId;
    const userId = req.user.id;

    try {
        const conversation = await Conversation.findById(conversationId);

        if (conversation.members.find(memberId => memberId === userId)) {
            const messages = await Message.find({
                conversationId: conversationId,
            })
            res.status(200).json(messages);
        } 
        
        res.status(403).json({error: "ban khong the xem cuoc tro chuyen nay."});   
        
    } catch (err) {
        res.status(500).json(err);
    }
}

module.exports = {createMessageController, getMessageController}