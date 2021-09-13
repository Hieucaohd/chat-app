commentAboutRoom = {
	_id: String,
	roomId: Number,
	content: {
		image: String,
		text: {
			listUserMentioned: Array,
			body: String,
		}
	}
	senderId: Number,
	likedUser: Array,
	createdAt: Date,
	updatedAt: Date,
}

commentAboutUser = {
	_id: String,
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
	createdAt: Date,
	updatedAt: Date,
}
