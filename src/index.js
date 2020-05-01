import { GraphQLServer } from 'graphql-yoga'
import { typeDefs } from './typedefs'
import { queryResolvers } from './resolvers/query'
import { mutationResolvers, post, user, comment } from './resolvers/mutation'

const resolvers = {
    Query: queryResolvers,
    Mutation: mutationResolvers,
    Post: post,
    User: user,
    Comment: comment,
}

const server = new GraphQLServer({
    typeDefs,
    resolvers
})

server.start(() => {
    console.log('Arrambichaachu')
})