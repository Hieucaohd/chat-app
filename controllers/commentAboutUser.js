const CommentAboutUser = require("../models/CommentAboutUser");

const createCommentAboutUserController = async (req, res) => {
	if (!req.user.isAuthenticated) {
		res.status(403).json({error: "permission denided!"});
	}

	if (!req.body || !req.body.userId || !req.body.content) {
		res.status(400).json({error: "bad request!"});
	}

	const newComment = new CommentAboutUser({
		userId: req.body.userId,
		content: req.body.content, 				 
		senderId: req.user.id, 					 // lay tu authentication
		likedUser: req.body.likedUser,
		parentCommentId: req.body.parentCommentId,
		nested: req.body.nested,
	})

	const savedComment = await newComment.save();
	res.status(200).json(savedComment);
}

module.exports = { createCommentAboutUserController };
