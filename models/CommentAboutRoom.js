const mongoose = require('mongoose');

const commentAboutRoomSchema = new mongoose.Schema(
	{
		roomId: Number,
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
		senderId: Number,
		likedUser: Array,
		parentCommentId: String,
		nested: {
			type: Number,
			default: 0,
		},
	},
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("commentAboutRoom", commentAboutRoomSchema);
