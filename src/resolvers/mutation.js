import uuid from 'uuid/v4'

let users = [{
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

let posts = [{
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

let comments = [{
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

const mutationResolvers = {
    createUser(parent, { data: args }, ctx, info) {
        const emailTaken = users.some((user) => user.email === args.email)
        console.log('arg', args)
        console.log('emailTaken', emailTaken)
        if (emailTaken) {
            throw new Error('Email taken!')
        }

        const user = {
            id: uuid(),
            ...args,
        }
        console.log('user', user)
        users.push(user)
        return user
    },
    deleteUser(parent, args, ctx, info) {
        const userIndex = users.findIndex(user => user.id === args.id)

        if (userIndex === -1) {
            throw new Error('User not found!')
        }

        const deleteUsers = users.splice(userIndex, 1)
        posts = posts.filter(post => {
            const match = post.author === args.id
            if (match) {
                comments = comments.filter((comment) => comment.post !== post.id)
            }
            return !match
        })
        comments = comments.filter(comment => comment.author !== args.id)
        return deleteUsers[0]
    },
    createPost(parent, { data: args }, ctx, info) {
        const userExists = users.some((user) => user.id === args.author)
        if (!userExists) {
            throw new Error('User not found!')
        }
        const post = {
            id: uuid(),
            ...args
        }

        posts.push(post)
        return post
    },
    deletePost(parent, args, ctx, info) {
        const postIndex = posts.findIndex(post => post.id === args.id)

        if (postIndex === -1) {
            throw new Error('Post not found!')
        }
        const deletePosts = posts.splice(postIndex, 1)
        comments = comments.filter(comment => comment.post !== args.id)
        return deletePosts[0]
    },
    createComment(parent, { data: args }, ctx, info) {
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
            ...args
        }
        comments.push(comment)
        return comment
    },
    deleteComment(parent, args, ctx, info) {
        const commentIndex = comments.findIndex(comment => comment.id === args.id)

        if (commentIndex === -1) {
            throw new Error('Comment not found!')
        }
        const deleteComments = comments.splice(commentIndex, 1)
        return deleteComments[0]
    }
}

const post = {
    author(parent, args, ctx, info) {
        return users.find((user) => user.id === parent.author)
    },
    comments(parent, args, ctx, info) {
        return comments.filter((comment) => comment.post === parent.id)
    }
}

const user = {
    posts(parent, args, ctx, info) {
        return posts.filter((post) => post.author === parent.id)
    },
    comments(parent, args, ctx, info) {
        return comments.filter((comment) => comment.author === parent.id)
    }
}

const comment = {
    author(parent, args, ctx, info) {
        return users.find((user) => user.id === parent.author)
    },
    post(parent, args, ctx, info) {
        return posts.find((post) => post.id === parent.post)
    }
}

export { 
    mutationResolvers, 
    post, user, comment,
    posts, users, comments
}