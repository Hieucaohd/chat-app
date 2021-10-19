const Comment = require("../models/Comment");

const createCommentAboutUserController = async (req, res) => {
	const newComment = new Comment({
		content: req.body.content, 				 
		senderId: req.user.id, 					 // lay tu authentication
		receiverId: req.body.receiverId,
		likedUser: req.body.likedUser,
		parentCommentId: req.body.parentCommentId,
		nested: req.body.nested,
		type_comment: "user_comment",
	})

	const savedComment = await newComment.save();
	return res.status(200).json(savedComment);
}

module.exports = { createCommentAboutUserController };
