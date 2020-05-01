import uuid from 'uuid/v4'
import { users, posts, comments } from '../demo-data'

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

export { mutationResolvers, post, user, comment }