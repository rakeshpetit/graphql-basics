import { GraphQLServer } from 'graphql-yoga'
import uuid from 'uuid/v4'

//Demo data
const users = [{
    id: "1",
    name: 'Rakesh',
    email: 'rak@example.com',
    age: 27
}, {
    id: "2",
    name: 'Aiswarya',
    email: 'aiswa@example.com',
},
{
    id: "3",
    name: 'Eashwar',
    email: 'eash@example.com',
}]

const posts = [{
    id: "1",
    title: 'RN best practices',
    body: 'body of RN best practices',
    published: true,
    author: "1"
}, {
    id: "2",
    title: 'Learn GraphQL',
    body: 'body of GraphQL',
    published: false,
    author: "1"
}, {
    id: "3",
    title: 'Learn to make pani puri',
    body: 'body of Pani puri',
    published: true,
    author: "2"
}]

const comments = [{
    id: "1",
    text: 'Loved it',
    author: "1",
    post: "1"
},
{
    id: "2",
    text: 'Liked it',
    author: "2",
    post: "1"
},
{
    id: "3",
    text: 'Makes total sense',
    author: "2",
    post: "2"
},
{
    id: "4",
    text: 'I disagree with this',
    author: "3",
    post: "3"
}]

const typeDefs = `
    type Query {
        users(query: String): [User!]!
        posts(query: String): [Post!]!
        comments: [Comment!]!
        me: User!
        post: Post!
    }

    type Mutation {
        createUser(name: String!, email: String!, age: Int): User!
        createPost(title: String!, body: String!, published: Boolean!, author: ID!): Post!
        createComment(text: String!, author: ID!, post: ID!): Comment!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
        posts: [Post!]!
        comments: [Comment!]!
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean
        author: User!
        comments: [Comment!]! 
    }

    type Comment {
        id: ID!
        text: String!
        author: User!
        post: Post!
    }
`

const resolvers = {
    Query: {
        users(parent, args, ctx, info) {
            if (!args.query) {
                return users
            }
            return users.filter((user) =>
                user.name.toLowerCase().includes(
                    args.query.toLowerCase()))
        },
        posts(parent, args, ctx, info) {
            if (!args.query) {
                return posts
            }
            return posts.filter((post) =>
                post.title.toLowerCase().includes(
                    args.query.toLowerCase()))
        },
        comments(parent, args, ctx, info) {
            return comments
        },
        me() {
            return {
                id: '1234',
                name: 'Rak',
                email: 'rak@example.com',
                age: 33
            }
        },
        post() {
            return {
                id: '12345',
                title: 'Dungeons and Dragons',
                body: 'A thoughtbot game',
                published: false
            }
        }
    },
    Mutation: {
        createUser(parent, args, ctx, info) {
            const emailTaken = users.some((user) => user.email === args.email)

            if (emailTaken) {
                throw new Error('Email taken!')
            }

            const user = {
                id: uuid(),
                name: args.name,
                email: args.email,
                age: args.age,
            }
            users.push(user)
            return user
        },
        createPost(parent, args, ctx, info) {
            const userExists = users.some((user) => user.id === args.author)
            if (!userExists) {
                throw new Error('User not found!')
            }
            const post = {
                id: uuid(),
                title: args.title,
                body: args.body,
                published: args.published,
                author: args.author
            }

            posts.push(post)
            return post
        },
        createComment(parent, args, ctx, info) {
            const userExists = users.some((user) => user.id === args.author)
            if (!userExists) {
                throw new Error('User not found!')
            }
            const postValid = posts.some((post) => (post.id === args.post && post.published))
            if (!postValid) {
                throw new Error('Post invalid!')
            }
            const comment = {
                id: uuid(),
                text: args.text,
                author: args.author,
                post: args.post,
            }
            comments.push(comment)
            return comment
        }
    },
    Post: {
        author(parent, args, ctx, info) {
            return users.find((user) => user.id === parent.author)
        },
        comments(parent, args, ctx, info) {
            return comments.filter((comment) => comment.post === parent.id)
        }
    },
    User: {
        posts(parent, args, ctx, info) {
            return posts.filter((post) => post.author === parent.id)
        },
        comments(parent, args, ctx, info) {
            return comments.filter((comment) => comment.author === parent.id)
        }
    },
    Comment: {
        author(parent, args, ctx, info) {
            return users.find((user) => user.id === parent.author)
        },
        post(parent, args, ctx, info) {
            return posts.find((post) => post.id === parent.post)
        }
    }
}

const server = new GraphQLServer({
    typeDefs,
    resolvers
})

server.start(() => {
    console.log('Arrambichaachu')
})