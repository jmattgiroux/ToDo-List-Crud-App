/**
 * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
 * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
 *
 * File uses insights and code from
 * https://github.com/byui-cse/cse341-code-student/blob/L02-personal-solution/db/connect.js
 * especially line 14 onwards.
 */
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


module.exports = {
    initDatabase,
    getDatabase,
};