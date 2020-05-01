const Query = {
    users(parent, args, { db }, info) {
        if (!args.query) {
            return db.users
        }
        return db.users.filter((user) =>
            user.name.toLowerCase().includes(
                args.query.toLowerCase()))
    },
    posts(parent, args, { db }, info) {
        if (!args.query) {
            return db.posts
        }
        return db.posts.filter((post) =>
            post.title.toLowerCase().includes(
                args.query.toLowerCase()))
    },
    comments(parent, args, { db }, info) {
        return db.comments
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

export { Query as default }