const graphql = require('graphql');

const CommentAboutUser = require("../models/CommentAboutUser");
const CommentAboutRoom = require("../models/CommentAboutRoom");
const Conversation = require("../models/Conversation");
const Message = require("../models/Message");

const {
	GraphQLObjectType, 
	GraphQLString, 
	GraphQLSchema,
	GraphQLID,
	GraphQLInt,
	GraphQLList,
	GraphQLBoolean,
} = graphql;

const ConversationType = new GraphQLObjectType({
	name: "Conversation",
	fields: () => ({
		id: {
			type: GraphQLID,
		},
		members: {
			type: new GraphQLList(GraphQLID),
		},
		isHided: {
			type: GraphQLBoolean,
		},
		messages: {
			type: new GraphQLList(MessageType),
			args: {
				numberMessages: { type: GraphQLInt }
			},
			resolve(parent, args, request) {
				return Message.find({ conversationId: parent.id })
					.sort({ createdAt: "desc" })
					.limit(args.numberMessages);
			},
		}
	})
})

const MessageType = new GraphQLObjectType({
	name: "Message",
	fields: () => ({
		id: { type: GraphQLID },
		conversationId: { type: GraphQLID }	,
		senderId: { type: GraphQLID },
		text: { type: GraphQLString },
		createdAt: { type: GraphQLString },
		updatedAt: { type: GraphQLString },
	}),
})

const UserMentionedType = new GraphQLObjectType({
	name: "UserMentioned",
	fields: () => ({
		userId: {
			type: GraphQLID,
		},
		position: {
			type: GraphQLInt,
		},
	})
})

const TextType = new GraphQLObjectType({
	name: "Text",
	fields: () => ({
		listUserMentioned: {
			type: new GraphQLList(UserMentionedType),
		},
		body: {
			type: GraphQLString,
		},
	})
})

const ContentType = new GraphQLObjectType({
	name: "Content",
	fields: () => ({
		image: {
			type: GraphQLString,
		},
		text: {
			type: TextType,
		},
	})
})

const CommentAboutUserType = new GraphQLObjectType({
	name: "CommentAboutUser",
	fields: () => ({
		id: {
			type: GraphQLID,
		},
		userId: {
			type: GraphQLID,
		},
		senderId: {
			type: GraphQLID,
		},
		likedUser: {
			type: new GraphQLList(GraphQLID),
		},
		parentCommentId: {
			type: GraphQLID,
		},
		nested: {
			type: GraphQLInt,
		},
		createdAt: {
			type: GraphQLString,
		},
		updatedAt: {
			type: GraphQLString,
		},
		content: {
			type: ContentType,
		},
		childComments: {
			type: new GraphQLList(CommentAboutUserType),
			args: {
				numberComments: { type: GraphQLInt },
			},
			resolve(parent, args, request) {
				if (args.numberComments) {
					return CommentAboutUser.find({ parentCommentId: parent.id })
						.sort({ createdAt: "desc" })
						.limit(args.numberComments);
				}
				return CommentAboutUser.find({ parentCommentId: parent.id })
					.sort({ createdAt: "desc" });
			},
		}
	})
})

const CommentAboutRoomType = new GraphQLObjectType({
	name: "CommentAboutRoom",
	fields: () => ({
		id: {
			type: GraphQLID,
		},
		roomId: {
			type: GraphQLID,
		},
		senderId: {
			type: GraphQLID,
		},
		likedUser: {
			type: new GraphQLList(GraphQLID),
		},
		parentCommentId: {
			type: GraphQLID,
		},
		nested: {
			type: GraphQLInt,
		},
		createdAt: {
			type: GraphQLString,
		},
		updatedAt: {
			type: GraphQLString,
		},
		content: {
			type: ContentType,
		},
		childComments: {
			type: new GraphQLList(CommentAboutRoomType),
			args: {
				numberComments: { type: GraphQLInt },
			},
			resolve(parent, args, request) {
				if (args.numberComments) {
					return CommentAboutRoom.find({ parentCommentId: parent.id })
						.sort({ createdAt: "desc" })
						.limit(args.numberComments);
				}
				return CommentAboutRoom.find({ parentCommentId: parent.id })
					.sort({ createdAt: "desc" });
			},
		}
	})
})

const RootQuery = new GraphQLObjectType({
	name: "RootQueryType",
	fields: {
		CommentAboutUserById: {
			type: CommentAboutUserType,
			args: {
				id: { type: GraphQLID }
			},
			resolve(parent, args, request) {
				return CommentAboutUser.findById(args.id);
			},
		},
		CommentAboutUsers: {
			type: new GraphQLList(CommentAboutUserType),
			args: {
				userId: { type: GraphQLID },
				numberComments: { type: GraphQLInt },
			},
			resolve(parent, args, request) {
				if (args.numberComments) {
					return CommentAboutUser.find({ userId: args.userId, nested: 0 })
						.sort({ createdAt: "desc" })
						.limit(args.numberComments);
				}
				return CommentAboutUser.find({ userId: args.userId, nested: 0 })
					.sort({ createdAt: "desc" });
			},
		},
		CommentAboutRoomById: {
			type: CommentAboutRoomType,
			args: {
				id: { type: GraphQLID },
			},
			resolve(parent, args, request) {
				return CommentAboutRoom.findById(args.id);
			},
		},
		CommentAboutRooms: {
			type: new GraphQLList(CommentAboutRoomType),
			args: {
				roomId: { type: GraphQLID },
				numberComments: { type: GraphQLInt },
			},
			resolve(parent, args, request) {
				if (args.numberComments) {
					return CommentAboutRoom.find({ roomId: args.roomId, nested: 0 })
						.sort({ createdAt: "desc" })
						.limit(args.numberComments);
				}

				return CommentAboutRoom.find({ roomId: args.roomId, nested: 0 })
					.sort({ createdAt: "desc" });
			},
		},
		ConversationsOfUser: {
			type: new GraphQLList(ConversationType),
			args: {
				numberConversations: { type: GraphQLInt },
			},
			resolve(parent, args, request) {
				if (args.numberConversations) {
					return Conversation.find({ members: { $in: [request.user.id] } })
						.limit(args.numberConversations);
				}

				return Conversation.find({ members: { $in: [request.user.id] } });
			}
		},
		ConversationById: {
			type: ConversationType,
			args: {
				id: { type: GraphQLID },
			},
			async resolve(parent, args, request) {
				const conversation = await Conversation.findById(args.id);
				const userId = request.user.id;
				if (conversation.members.find(memberId => memberId === userId)) {
					return conversation;
				}

				return null;
			}
		}	
	}
});

module.exports = new GraphQLSchema({
	query: RootQuery,
})
