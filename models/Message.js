const mongoose = require("mongoose");

const messageSchema = mongoose.Schema(
    {
        conversationId: {
            type: String,
        },
        senderId: {
            type: Number,
        },
        text: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("message", messageSchema);
