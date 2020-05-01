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

const db = {
    users,
    posts,
    comments
}
export { db as default }