const { buildSchema } = require("graphql");

module.exports = buildSchema(`
    type User {
        id: ID
        username: String
        apiKey: String
        createdAt: String
        updatedAt: String
    }
    type Image {
        id: ID
        filename: String
        createdAt: String
        updatedAt: String
        user: User
        comments: [Comment]
    }
    type Comment {
        id: ID
        text: String
        createdAt: String
        updatedAt: String
        user: User
    }
    type Query {
        images: [Image]
    }
    type Mutation {
        createComment(apiKey: String!, text: String!, imageId: ID!): Comment
    }
`);
