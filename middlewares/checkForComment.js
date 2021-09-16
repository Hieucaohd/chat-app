const CommentAboutRoom = require("../models/CommentAboutRoom");
const CommentAboutUser = require("../models/CommentAboutUser");


const check = async (req, res, model, receiverId, takeReceiverId) => {
	if (!req.user.isAuthenticated) {
		return res.status(403).json({error: "permission denided, you must authenticated."});
	}

	if (!receiverId) {
		return res.status(403).json({ error: "you must send receiverId" });
	}

	if (req.body.nested < 0 || req.body.nested > 2) {
		return res.status(400).json({error: "nested must be >= 0 and <= 2"});
	}

	if (req.body.parentCommentId) {
		if (req.body.nested === 0) {
			return req.status(400).json({ error: "nested must >= 1 when have parentCommentId" });
		} else {
			const parentComment = await model.findById(req.body.parentCommentId);
			if (
					!(
						receiverId === takeReceiverId(parentComment) && 
						req.body.nested === (parentComment.nested + 1)
					 )
			   ) {
				return res.status(400).json({ error: "child comment is not accurate." });
			}
		}
	}

}

const takeUserId = (item) => {
	return item.userId;
}

const takeRoomId = (item) => {
	return item.roomId;
}

const checkForUser = async (req, res, next) => {

	const resultCheck = await check(req, res, CommentAboutUser, req.body.userId, takeUserId);

	return next();

}

const checkForRoom = async (req, res, next) => {

	const resultCheck = await check(req, res, CommentAboutRoom, req.body.roomId, takeRoomId);

	return next();

}

module.exports = {checkForRoom, checkForUser};
