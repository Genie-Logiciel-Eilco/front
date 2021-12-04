import axios from "axios";
import API_URL from "../Helpers/API_URL";
import authHeader from "./authHeader";

const getBooks = async () => {
    return await axios.get(`${API_URL.API_ENDPOINT}/api/books`, {
        headers: authHeader(),
    });
};
const searchBooks = async (data) => {
    return await axios.post(`${API_URL.API_ENDPOINT}/api/books/search`, data, {
        headers: authHeader(),
    });
}

const getCategories = async () => {
    return await axios.get(`${API_URL.API_ENDPOINT}/api/categories`, {
        headers: authHeader(),
    })
};

const getOneBook = async (book) => {
    return await axios.get(`${API_URL.API_ENDPOINT}/api/book/${book}`, {
        headers: authHeader(),
    });
};


// FAVORITE
const addToFavorite = async (book) => {
    return await axios.post(`${API_URL.API_ENDPOINT}/api/user/favorites/attachBook/${book}`, {},
        {
            headers: authHeader(),
        });
}

const getFavoriteBooks = async (book) => {
    return await axios.get(`${API_URL.API_ENDPOINT}/api/user/favorites`, {
        headers: authHeader()
    });
}

const deleteFromFavorite = async (book) => {
    return await axios.post(`${API_URL.API_ENDPOINT}/api/user/favorites/detachBook/${book}`, {}, {
        headers: authHeader()
    });
}

const bookService = {
    getBooks,
    getCategories,
    searchBooks,
    getOneBook,
    addToFavorite,
    getFavoriteBooks,
    deleteFromFavorite
};

export default bookService;
