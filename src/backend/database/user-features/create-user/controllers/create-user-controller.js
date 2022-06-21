const database = require("../../../database-model");

const addSingleUser = async (req, res, next) => {
    try {
        const user = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            favoriteColor: req.body.favoriteColor,
            birthday: req.body.birthday,
            favoriteAnimal: req.body.favoriteAnimal,
            favoriteFood: req.body.favoriteFood,
            favoriteSong: req.body.favoriteSong,
            userCreationDate: req.body.userCreationDate
        };

        const db = await database.getDatabase().db("todo-list-crud-app");

        // https://stackoverflow.com/questions/56034459/how-to-fix-err-is-not-defined-error-in-nodejs
        const collection = await db.collection("users");
        await collection.insertOne(task);
        // const result = await database
        //     .getDatabase()
        //     .db("todo-list-crud-app")
        //     .collection("users")
        //     .insertOne(task);

        if (result.acknowledged) {
            res.status(201).json(result);
        } else {
            res
                .status(500)
                .json(result.err || "Error occurred during user creation");
        }
    } catch {
        res.status(500);
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    addSingleUser,
};