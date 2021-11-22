import axios from "axios";
import API_ENDPOINT from "../Helpers/API_URL";
import authHeader from "./authHeader";

const accessToken = "TempToken";

const getBooks = async () => {
    return await axios.get(`${API_ENDPOINT}/api/books`, {
        headers: authHeader(),
    });
};

const getCategories = async () => {
    return await axios.get(`${API_ENDPOINT}/api/categories`, {
        headers: authHeader(),
    })
};

const bookService = {
    getBooks,
    getCategories,
};

export default bookService;
