
const dotenv = require("dotenv");
dotenv.config();
const MONGODB_URI = process.env.MONGODB_URI;

const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema')

const app = express();

const PORT = process.env.PORT || 3000;

//This route will be used as an endpoint to interact with Graphql, 
//All queries will go through this route. 
app.use('/graphql', graphqlHTTP({
    //directing express-graphql to use this schema to map out the graph 
    schema,
    //directing express-graphql to use graphiql when goto '/graphql' address in the browser
    //which provides an interface to make GraphQl queries
    graphiql: true
}));

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

const mongoose = require('mongoose');

mongoose.connect(MONGODB_URI)

mongoose.connection.once('open', () => {
    console.log('connected to database');
});