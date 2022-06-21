const router = require("express").Router();
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

router.get("/api-docs", swaggerUi.setup(swaggerDocument));
router.use("/api-docs", swaggerUi.serve);

module.exports = router;
