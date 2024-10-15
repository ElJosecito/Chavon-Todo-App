import axios from '../libs/axios';



export const getTodoById = async (id) => {
    try {
        const response = await axios.get(`/task/${id}`);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const getTodos = async (id) => {
    try {
        const response = await axios.get(`/tasks/${id}`);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const createTodo = async (id, task) => {
    try {
        const response = await axios.post(`/tasks/create/${id}`, task);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const updateTodo = async (id, task) => {
    try {
        const response = await axios.put(`/task/update/${id}`, task);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const deleteTodo = async (id) => {
    try {
        const response = await axios.delete(`/task/delete/${id}`);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};
