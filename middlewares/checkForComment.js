const Comment = require("../models/Comment");

const check = async (req, res, next) => {
	if (!req.user.isAuthenticated) {
		// kiem tra xem user dang nhap hay chua.
		return res.status(403).json({error: "permission denided, you must authenticated."});
	}

	if (!req.body.receiverId) {
		// kiem tra co receiverId hay khong.
		return res.status(400).json({ error: "required receiverId" });
	}

	if (req.body.nested < 0 || req.body.nested > 2) {
		// nested phai <= 2 va >= 0
		return res.status(400).json({error: "nested must be >= 0 and <= 2"});
	}

	if (req.body.parentCommentId) {
		// neu comment tra loi mot comment khac
		if (req.body.nested === 0) {
			return res.status(400).json({ error: "nested must >= 1 when have parentCommentId" });
		} else {
			const parentComment = await Comment.findById(req.body.parentCommentId);
			if (
					!(
						req.body.receiverId === parentComment.receiverId && 
						req.body.nested === (parentComment.nested + 1)
					 )
			   ) {
				return res.status(400).json({ error: "receiverId and nested is not accurate." });
			}
		}
	}
	
	return next();
}

module.exports = check;
