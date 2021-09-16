const CommentAboutRoom = require("../models/CommentAboutRoom");

const createCommentAboutRoomController = async (req, res) => {
	const newComment = new CommentAboutRoom({
		roomId: req.body.roomId,
		content: req.body.content,
		senderId: req.user.id,
		likedUser: req.body.likedUser,
		parentCommentId: req.body.parentCommentId,
		nested: req.body.nested,
	})

	const savedComment = await newComment.save();

	return res.status(200).json(savedComment);
};

module.exports = {createCommentAboutRoomController};
