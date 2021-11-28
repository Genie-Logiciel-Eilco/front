import axios from "axios";
import API_ENDPOINT from "../Helpers/API_URL";
import authHeader from "./authHeader";

const accessToken = "TempToken";

const getBooks = async () => {
    return await axios.get(`${API_ENDPOINT}/api/books`, {
        headers: authHeader(),
    });
};
const searchBooks=async(data)=>{
    return await axios.post(`${API_ENDPOINT}/api/books/search`,data,{
        headers: authHeader(),
    });
}

const getCategories = async () => {
    return await axios.get(`${API_ENDPOINT}/api/categories`, {
        headers: authHeader(),
    })
};

const getOneBook = async (book) => {
    return await axios.get(`${API_ENDPOINT}/api/book/${book}`, {
        headers : authHeader(),
    });
    
};

const bookService = {
    getBooks,
    getCategories,
    searchBooks,
    getOneBook,
};

export default bookService;
