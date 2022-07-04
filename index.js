// Code for this file was imported from 
// https://medium.com/@utkarshprakash/setting-up-graphql-server-with-nodejs-express-and-mongodb-d72fba13216

const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');

const app = express();

const dotenv = require("dotenv");
dotenv.config();

const port = process.env.PORT || 3000;

const url = process.env.MONGODB_URI;

const mongoose = require('mongoose');

mongoose.connect(url);



//This route will be used as an endpoint to interact with Graphql, 
//All queries will go through this route. 
app.use('/graphql', graphqlHTTP({
    //directing express-graphql to use this schema to map out the graph 
    schema,
    //directing express-graphql to use graphiql when goto '/graphql' address in the browser
    //which provides an interface to make GraphQl queries
    graphiql: true
}));


app.listen(port, () => {
    console.log('Listening on port ' + port);
});

mongoose.connection.once('open', () => {
    console.log('connected to database');
});