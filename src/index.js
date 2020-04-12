import { GraphQLServer } from 'graphql-yoga'

const typeDefs = `
    type Query {
        greeting(name: String): String!
        add(numbers: [Float!]!): Float!
        grades: [Int!]!
        me: User!
        post: Post!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        isPublished: Boolean
    }
`

const resolvers = {
    Query: {
        greeting(parent, args, ctx, info) {
            if(args.name) {
                return `Hello ${args.name}`
            }
            return 'Hello!!'
        },
        add(parent, args, ctx, info){
            if(args.numbers.length === 0)
            return 0;
            return args.numbers.reduce((acc, nums) => (nums+acc), 0)
        },
        grades() {
            return [199, 197, 195]
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
                isPublished: false
            }
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