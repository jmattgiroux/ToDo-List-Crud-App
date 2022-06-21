const addSingleTask = async (req, res, next) => {
    try {
        const task = {
        };

        const result = await database
            .getDatabase()
            .db("todo-list-crud-app")
            .collection("tasks")
            .insertOne(task);

        if (result.acknowledged) {
            res.status(201).json(result);
        } else {
            res
                .status(500)
                .json(result.error || "Error occurred during task creation");
        }
    } catch {
        res.status(500).json({ message: err.message });
    }
};