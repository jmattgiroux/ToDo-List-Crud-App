// Code for this file was imported from 
// https://medium.com/@utkarshprakash/setting-up-graphql-server-with-nodejs-express-and-mongodb-d72fba13216

const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');

const app = express();


const port = process.env.PORT || 3000;

const MongoClient = require("mongodb").MongoClient;
const dotenv = require("dotenv");
dotenv.config();
const url = process.env.url;

let database;

const initDatabase = (callback) => {
    if (database) {
        console.log("Database is already initialized!!!");
        return callback(null, database);
    }

    MongoClient.connect(url)
        .then((client) => {
            database = client;
            callback(null, database);
        })
        .catch((error) => {
            callback(error);
        });
};

// function below should work since database was declared around line 14 and initialized in initDatabase.
const getDatabase = () => {
    if (!database) {
        throw Error("Database not initialized!!!");
    }
    return database;
};



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

initDatabase((error) => {
    if (error) {
        console.log(error);
    } else {
        app.listen(port);
        console.log(`Connected to database and listening on ${port}`);
    }
});