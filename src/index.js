import { GraphQLServer, PubSub } from 'graphql-yoga'
import { Subscription, Query, Mutation, Post, User, Comment } from './resolvers'
import db from './db'

const pubsub = new PubSub()

const resolvers = {
    Query,
    Mutation,
    Subscription,
    Post,
    User,
    Comment,
}

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: {
        db,
        pubsub
    }
})

server.start(() => {
    console.log('Arrambichaachu')
})