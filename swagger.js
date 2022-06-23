const swaggerAutogen = require("swagger-autogen")();

const doc = {
    info: {
        title: "ToDo List API",
        description: "ToDo List API",
    },

    host: "localhost:8080",
    schemes: ["http"]
    // host: "https://jmg-todo-list-crud-app.herokuapp.com/",
    // schemes: ["https"]
};

const outputFile = "./src/backend/api-documentation/swagger.json";
const endpointsFiles = ["./src/backend/database/database-routes.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);
