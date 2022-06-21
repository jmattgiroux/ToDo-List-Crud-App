// app.js for todo-list-crud-app, app starts here

const bodyParser = require("body-parser");
const app = require("express")();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./src/backend/api-documentation/swagger.json');
const mongoDatabase = require("./src/backend/database/database-model.js");

const PORT = process.env.PORT || 8080;

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app
    .use(bodyParser.json())
    .use((req, res, next) => {
        res.setHeader(
            "Access-Control-Allow-Origin",
            "*"
            // "https://cse341-contacts-frontend.netlify.app/"
        );
        res.setHeader(
            "Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content-Type, Accept, Z-Key"
        );
        res.setHeader("Content-Type", "application/json");
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        next();
    })
    .use("/", require("./src/backend/database/database-routes.js"));

mongoDatabase.initDatabase((error) => {
    if (error) {
        console.log(error);
    } else {
        app.listen(PORT);
        console.log(`Connected to database and listening on ${PORT}`);
    }
});
