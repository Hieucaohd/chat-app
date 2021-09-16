const CommentAboutUser = require("../models/CommentAboutUser");

const createCommentAboutUserController = async (req, res) => {
	const newComment = new CommentAboutUser({
		userId: req.body.userId,
		content: req.body.content, 				 
		senderId: req.user.id, 					 // lay tu authentication
		likedUser: req.body.likedUser,
		parentCommentId: req.body.parentCommentId,
		nested: req.body.nested,
	})

	const savedComment = await newComment.save();
	return res.status(200).json(savedComment);
}

module.exports = { createCommentAboutUserController };
