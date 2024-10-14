import axios from '../api/axios';

export const login = async (email, password) => {
    try {
        const response = (await axios.post('/auth/login', { email, password }));
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};


export const register = async (email, password, firstName, lastName) => {
    try {
        const response = await axios.post('/auth/register', { email, password, firstName, lastName});
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};