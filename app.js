
const dotenv = require("dotenv");
dotenv.config();
const MONGODB_URI = process.env.MONGODB_URI;

const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema')
const { ApolloServer, gql } = require('apollo-server');
const app = express();

const PORT = process.env.PORT || 3000;

//This route will be used as an endpoint to interact with Graphql, 
//All queries will go through this route. 
// app.use('/graphql', graphqlHTTP({
//     //directing express-graphql to use this schema to map out the graph 
//     schema,
//     //directing express-graphql to use graphiql when goto '/graphql' address in the browser
//     //which provides an interface to make GraphQl queries
//     graphiql: true
// }));

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
    # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

    # This "Book" type defines the queryable fields for every book in our data source.
    type Book {
    title: String
    author: String
    }

    # The "Query" type is special: it lists all of the available queries that
    # clients can execute, along with the return type for each. In this
    # case, the "books" query returns an array of zero or more Books (defined above).
    type Query {
    books: [Book]
    }
`;

// app.listen(PORT, () => {
//     console.log(`Listening on port ${PORT}`);
// });

// const mongoose = require('mongoose');

// mongoose.connect(MONGODB_URI)

// mongoose.connection.once('open', () => {
//     console.log('connected to database');
// });

const books = [
    {
        title: 'The Awakening',
        author: 'Kate Chopin',
    },
    {
        title: 'City of Glass',
        author: 'Paul Auster',
    },
];

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
    Query: {
        books: () => books,
    },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    cache: 'bounded',
});

// The `listen` method launches a web server.
server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
    console.log(`
        ????  Server is ready at ${url}
        ????  Query at https://studio.apollographql.com/dev
    `);
});