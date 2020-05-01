import { GraphQLServer } from 'graphql-yoga'
import { Query, Mutation, Post, User, Comment } from './resolvers'
import db from './db'

const resolvers = {
    Query,
    Mutation,
    Post,
    User,
    Comment,
}

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: {
        db
    }
})

server.start(() => {
    console.log('Arrambichaachu')
})