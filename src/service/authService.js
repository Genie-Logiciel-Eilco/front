import axios from 'axios'
import API_URL from '../Helpers/API_URL';

// const local = "http:localhost:8000"


const login = (data) => {
    return axios.post(`${API_URL.API_ENDPOINT}/api/login`, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

const signup = (data) => {
    return axios.post(`${API_URL.API_ENDPOINT}/api/register`, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

const forgotPassword = (email) => {
    return axios.post(`${API_URL.API_ENDPOINT}/api/user/forgotPassword`, email)
}

const resetPassword = (data) => {
    return axios.post(`${API_URL.API_ENDPOINT}/api/user/resetPassword`, data)
}

const authService = {
    login,
    signup,
    forgotPassword,
    resetPassword
}

export default authService;

//