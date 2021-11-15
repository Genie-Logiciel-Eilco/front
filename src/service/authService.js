import axios from 'axios'
import API_ENDPOINT from '../Helpers/API_URL';

// const local = "http:localhost:8000"


const login = (data) => {
    return axios.post(`${API_ENDPOINT}/api/login`, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
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
}

export default authService;

//