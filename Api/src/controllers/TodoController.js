import fs from "fs";
// uuid
import { v4 as uuidv4 } from "uuid";

// Leer archivo JSON
const readData = () => {
    const data = fs.readFileSync('../api/src/data/todos.json', 'utf-8');
    return JSON.parse(data);
};

// Guardar datos en archivo JSON
const writeData = (data) => {
    fs.writeFileSync('../api/src/data/todos.json', JSON.stringify(data, null, 2));
};


//get all todos
const getTodos = async (req, res) => {
    try {
        // get all todos
        const todos = await readData();

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
        const { title, description, toBeFinishedAt } = req.body;

        const todos = await readData();

        const newTodo = {
            id: uuidv4(),
            title,
            description,
            status: "pending",
            createdAt: new Date(),
            toBeFinishedAt: new Date(toBeFinishedAt),
            finishedAt: null,
        };

        todos.push(newTodo);

        writeData(todos);

        res.status(201).send({
            status: 201,
            message: "Todo created successfully",
            todo: newTodo,
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
        const { title, description, status, toBeFinishedAt } = req.body;

        const todos = await readData();

        const todo = todos.find(todo => todo.id === req.params.id);

        if (!todo) {
            return res.status(404).send({
                status: 404,
                message: "Todo not found",
            });
        }

        todo.title = title;
        todo.description = description;
        todo.status = status;
        todo.toBeFinishedAt = new Date(toBeFinishedAt);

        if (status !== "completed") {
            todo.finishedAt = null;
        }

        if (status === "completed") {
            todo.finishedAt = new Date();
        }


        writeData(todos);  

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
        const todos = await readData();

        const todo = todos.find(todo => todo.id === req.params.id);

        if (!todo) {
            return res.status(404).send({
                status: 404,
                message: "Todo not found",
            });
        }

        const index = todos.indexOf(todo);
        todos.splice(index, 1);

        writeData(todos);

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
        const todos = await readData();

        const todo = todos.find(todo => todo.id === req.params.id);

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