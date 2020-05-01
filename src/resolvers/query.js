import { users, posts, comments } from '../demo-data'

const queryResolvers = {
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
}

export { queryResolvers }