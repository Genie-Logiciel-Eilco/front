import axios from 'axios'
import API_ENDPOINT from '../Helpers/API_URL';

const local = "http:localhost:8000"


const login = (data) => {
    return axios.post(`${API_ENDPOINT}/api/login`, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

const authToken = () => {
    return JSON.parse(localStorage.getItem("data")).token;
}

const signup = (data) => {
    return axios.post(`${API_ENDPOINT}/api/register`, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

const authService = {
    login,
    signup,
    authToken
}

export default authService;

//