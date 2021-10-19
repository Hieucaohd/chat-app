const graphql = require('graphql');

const Comment = require("../models/Comment");
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
		id: { type: GraphQLID },
		members: { type: new GraphQLList(GraphQLID) },
		isHided: { type: GraphQLBoolean },
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
		userId: { type: GraphQLID },
		position: { type: GraphQLInt },
	})
})

const TextType = new GraphQLObjectType({
	name: "Text",
	fields: () => ({
		listUserMentioned: { type: new GraphQLList(UserMentionedType) },
		body: { type: GraphQLString },
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

const CommentType = new GraphQLObjectType({
	name: "Comment",
	fields: () => ({
		id: {
			type: GraphQLID,
		},
		receiverId: {
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
		type_comment: { type: GraphQLString },
		childComments: {
			type: new GraphQLList(CommentType),
			args: {
				numberComments: { type: GraphQLInt },
			},
			resolve(parent, args, request) {
				if (args.numberComments) {
					return Comment.find({ parentCommentId: parent.id })
						.sort({ createdAt: "desc" })
						.limit(args.numberComments);
				}
				return Comment.find({ parentCommentId: parent.id })
					.sort({ createdAt: "desc" });
			},
		}
	})
})

const RootQuery = new GraphQLObjectType({
	name: "RootQueryType",
	fields: {
		CommentsAboutUser: {
			type: new GraphQLList(CommentType),
			args: {
				userId: { type: GraphQLID },
				numberComments: { type: GraphQLInt },
			},
			resolve(parent, args, request) {
				if (args.numberComments) {
					return Comment.find({ receiverId: args.userId, nested: 0, type_comment: "user_comment" })
						.sort({ createdAt: "desc" })
						.limit(args.numberComments);
				}
				return Comment.find({ receiverId: args.userId, nested: 0, type_comment: "user_comment" })
					.sort({ createdAt: "desc" });
			},
		},
		CommentsAboutRoom: {
			type: new GraphQLList(CommentType),
			args: {
				roomId: { type: GraphQLID },
				numberComments: { type: GraphQLInt },
			},
			resolve(parent, args, request) {
				if (args.numberComments) {
					return Comment.find({ receiverId: args.roomId, nested: 0, type_comment: "room_comment" })
						.sort({ createdAt: "desc" })
						.limit(args.numberComments);
				}

				return Comment.find({ receiverId: args.roomId, nested: 0, type_comment: "room_comment" })
					.sort({ createdAt: "desc" });
			},
		},
		ChildComments: {
			type: new GraphQLList(CommentType),
			args: {
				parentCommentId: { type: GraphQLID },
				numberComments: { type: GraphQLInt },
			},
			resolve(parent, args, request) {
				if (args.numberComments) {
					return Comment.find({ parentCommentId: args.parentCommentId })
						.sort({ createdAt: "desc" })
						.limit(args.numberComments);
				}

				return Comment.find({ parentCommentId: args.parentCommentId })
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
		},
		tryGraphql: {
			type: GraphQLString,
			async resolve(parent, args, request) {
				return "Hello Hieucao";
			}
		}
	}
});

module.exports = new GraphQLSchema({
	query: RootQuery,
})
