import axios from 'axios'
import API_ENDPOINT from '../Helpers/API_URL';

const local = "http:localhost:8000"

const authToken = () => {
    return JSON.parse(localStorage.getItem("data")).token;
}


const authService = {
    authToken
}

export default authService;
