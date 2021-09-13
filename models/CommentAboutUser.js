const mongoose = require('mongoose');

const commentAboutUserSchema = new mongoose.Schema(
	{
		userId: Number,
		content: {
			image: String,
			text: {
				listUserMentioned: [{
					userId: Number,
					position: Number,
				}],
				body: String,
			}
		}
		senderId: Number,
		likedUser: Array,
		parentCommentId: String,
		nested: Number,
	},
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("commentAboutUser", commentAboutUserSchema);
