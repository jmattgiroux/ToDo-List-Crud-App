const router = require("express").Router();

const createUserController = require("./create-user/controllers/create-user-controller");

router.post("/", createUserController.addSingleUser);


module.exports = router;