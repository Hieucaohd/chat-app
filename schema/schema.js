const graphql = require('graphql');

const _ = require("lodash");
const {
	GraphQLObjectType, 
	GraphQLString, 
	GraphQLSchema,
	GraphQLID,
	GraphQLInt,
	GraphQLList,
	GraphQLBoolean,
} = graphql;

// dummy data
let books = [
	{name: "hieucao1", genre: "hieucao1 genre", id: "1", authorId: "1"},
	{name: "hieucao2", genre: "hieucao2 genre", id: "2", authorId: "2"},
	{name: "hieucao3", genre: "hieucao3 genre", id: "3", authorId: "3"},
	{name: "hieucao3", genre: "hieucao3 genre", id: "4", authorId: "1"},
	{name: "hieucao3", genre: "hieucao3 genre", id: "5", authorId: "2"},
	{name: "hieucao3", genre: "hieucao3 genre", id: "6", authorId: "3"},
]

let authors = [
	{name: "hieucao1", age: 1, id: "1"},
	{name: "hieucao2", age: 2, id: "2"},
	{name: "hieucao3", age: 3, id: "3"},
]

const AuthorType = new GraphQLObjectType({
	name: 'Author',
	fields: () => ({
		id: {
			type: GraphQLID,
		},
		name: {
			type: GraphQLString,
		},
		age: {
			type: GraphQLInt,
		},
		books: {
			type: new GraphQLList(BookType),
			resolve(parent, args) {
				return _.filter(books, {authorId: parent.id})
			}
		}
	})
})

const BookType = new GraphQLObjectType({
	name: 'Book',
	fields: () => ({
		id: {
			type: GraphQLID,
		},
		name: {
			type: GraphQLString,
		},
		genre: {
			type: GraphQLString,
		},
		author: {
			type: AuthorType,
			resolve(parent, args) {
				return _.find(authors, {id: parent.authorId});
			}
		}
	})
});

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
		}
	})
})

const RootQuery = new GraphQLObjectType({
	name: "RootQueryType",
	fields: {
		book: {
			type: BookType,
			args: {
				id: {
					type: GraphQLID,
				}
			},
			resolve(parent, args, request) {
				// code to get data from database
				console.log(request.user);
				console.log(request.user.isAuthenticated);
				return _.find(books, {id: args.id});
			}
		},
		author: {
			type: AuthorType,
			args: {
				id: {
					type: GraphQLID,
				}
			},
			resolve(parent, args){
				return _.find(authors, {id: args.id});
			}
		},
		books: {
			type: new GraphQLList(BookType),
			resolve(parent, args) {
				return books;
			}
		}
	}
});

module.exports = new GraphQLSchema({
	query: RootQuery,
})
