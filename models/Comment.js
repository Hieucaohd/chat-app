const mongoose = require('mongoose');

const comment = new mongoose.Schema(
	{
		content: {
			image: String,
			text: {
				listUserMentioned: [{
					userId: Number,
					position: Number,
				}],
				body: String,
			}
		},
		receiverId: Number,
		senderId: Number,
		likedUser: Array,
		parentCommentId: String,
		nested: {
			type: Number,
			default: 0,
		},
		type_comment: String,
	},
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("comment", comment);
