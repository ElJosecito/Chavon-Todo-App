import Todo from "../models/Todo.js";
import User from "../models/User.js";

//get all todos
const getTodos = async (req, res) => {
    try {
        const todos = await Todo.find({ user: req.user.id });

        res.status(200).send({
            status: 200,
            message: "Todos retrieved successfully",
            todos,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
}

//create todo
const createTodo = async (req, res) => {
    try {
        const { title, description, toBeFinisheAt } = req.body;

        const todo = new Todo({
            title,
            description,
            toBeFinisheAt,
            user: req.user.id,
        });

        await todo.save();

        await User.findByIdAndUpdate(req.user.id, {
            $push: {
                todos: todo._id,
            },
        });

        res.status(201).send({
            status: 201,
            message: "Todo created successfully",
            todo,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
}

//update todo
const updateTodo = async (req, res) => {
    try {
        const { title, description, status, toBeFinisheAt } = req.body;

        const todo = await Todo.findById(req.params.id);

        if (!todo) {
            return res.status(404).send({
                status: 404,
                message: "Todo not found",
            });
        }

        todo.title = title;
        todo.description = description;
        todo.status = status;
        todo.toBeFinishedAt = toBeFinisheAt;

        await todo.save();

        res.status(200).send({
            status: 200,
            message: "Todo updated successfully",
            todo,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
}

//delete todo
const deleteTodo = async (req, res) => {
    try {
        const todo = await Todo.findByIdAndDelete(req.params.id);

        if (!todo) {
            return res.status(404).send({
                status: 404,
                message: "Todo not found",
            });
        }

        await User.findByIdAndUpdate(req.user.id, {
            $pull: { todos: todo._id },
        });

        res.status(200).send({
            status: 200,
            message: "Todo deleted successfully",
        });

    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
};


const getTodo = async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);

        if (!todo) {
            return res.status(404).send({
                status: 404,
                message: "Todo not found",
            });
        }

        res.status(200).send({
            status: 200,
            message: "Todo retrieved successfully",
            todo,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
}

const todoController = {
    getTodos,
    createTodo,
    updateTodo,
    deleteTodo,
    getTodo,
};

export default todoController;