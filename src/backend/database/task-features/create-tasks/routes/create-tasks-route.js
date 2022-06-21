const router = require("express").Router();

const createTaskController = require("../controllers/create-tasks-controller");

router.post("/", createTaskController.addSingleTask);


module.exports = router;