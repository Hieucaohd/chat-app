const CommentAboutRoom = require("../models/CommentAboutRoom");

const createCommentAboutRoomController = async (req, res) => {
	if (!req.user.isAuthenticated) {
		res.status(403).json({error: "permission denided!"});
	}

	if (!req.body || !req.body.roomId || !req.body.content) {
		res.status(400).json({error: "bad request!"});
	}

	const newComment = new CommentAboutRoom({
		roomId: req.body.roomId,
		content: req.body.content,
		senderId: req.user.id,
		likedUser: req.body.likedUser,
		parentCommentId: req.body.parentCommentId,
		nested: req.body.nested,
	})

	const savedComment = await newComment.save();

	res.status(200).json(savedComment);
};

module.exports = {createCommentAboutRoomController};
