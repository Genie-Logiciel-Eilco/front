import axios from 'axios'
import API_ENDPOINT from '../Helpers/API_URL';
import authHeader from './authHeader';

const local = "http:localhost:8000"

const uploadImage = () => {

}

//const accessToken = JSON.parse(localStorage.getItem("data")).token;
const accessToken = "TempToken";

const getUsers = async (perPage) => {
    return await axios.get(`${API_ENDPOINT}/api/users/paginate/${perPage}`, { headers: authHeader() })
}

const getBooks = async (perPage) => {
    return await axios.get(`${API_ENDPOINT}/api/books/paginate/${perPage}`, { headers: authHeader() })
}

const getBooksByPage = async (pageNumber, perPageInput) => {
    return await axios.get(`http://104.248.39.111/api/books/paginate/${perPageInput}?page=${pageNumber}`, { headers: authHeader() })
}

const getAuthorsByPage = async (pageNumber) => {
    return await axios.get(`http://104.248.39.111/api/authors/paginate/2?page=${pageNumber}`, { headers: authHeader() })
}

const authService = {
    getUsers,
    getBooks,
    getBooksByPage,
    getAuthorsByPage,
    accessToken
}

export default authService;
