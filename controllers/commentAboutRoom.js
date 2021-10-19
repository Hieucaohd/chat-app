const Comment = require("../models/Comment");

const createCommentAboutRoomController = async (req, res) => {
	const newComment = new Comment({
		receiverId: req.body.receiverId,
		content: req.body.content,
		senderId: req.user.id,
		likedUser: req.body.likedUser,
		parentCommentId: req.body.parentCommentId,
		nested: req.body.nested,
		type_comment: "room_comment",
	})

	const savedComment = await newComment.save();

	return res.status(200).json(savedComment);
};

module.exports = {createCommentAboutRoomController};
