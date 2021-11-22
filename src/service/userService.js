import axios from "axios";
import API_ENDPOINT from "../Helpers/API_URL";
import authHeader from "./authHeader";

// const local = "http:localhost:8000";

// const uploadImage = () => { };

const accessToken = JSON.parse(localStorage.getItem("data")).token;

const getUsers = async (perPage) => {
    return await axios.get(`${API_ENDPOINT}/api/users/paginate/${perPage}`, {
        headers: authHeader(),
    });
};

const getBooks = async (perPage) => {
    return await axios.get(`${API_ENDPOINT}/api/books/paginate/${perPage}`, {
        headers: authHeader(),
    });
};

const getBooksByPage = async (pageNumber, perPageInput) => {
    return await axios.get(
        `${API_ENDPOINT}/api/books/paginate/${perPageInput}?page=${pageNumber}`,
        { headers: authHeader() }
    );
};

const getAuthorsByPage = async (pageNumber) => {
    return await axios.get(
        `${API_ENDPOINT}/api/authors/paginate/2?page=${pageNumber}`,
        { headers: authHeader() }
    );
};

const getAuthors = async () => {
    return await axios.get(`${API_ENDPOINT}/api/authors`, {
        headers: authHeader(),
    });
};

const getPublishers = async () => {
    return await axios.get(`${API_ENDPOINT}/api/publishers`, {
        headers: authHeader(),
    });
};

const getCategories = async () => {
    return await axios.get(`${API_ENDPOINT}/api/categories`, {
        headers: authHeader(),
    });
};

const uploadBook = (uuid, data) => {
    return axios.post(`${API_ENDPOINT}/api/book/add/${uuid}`, data, {
        headers: authHeader(),
        "Content-Type": "application/json",
    });
};

const deleteBook = (uuid) => {
    return axios.delete(`${API_ENDPOINT}/api/book/${uuid}`, {
        headers: authHeader(),
    });
};


const getBook = (uuid) => {
    return axios.get(`${API_ENDPOINT}/api/book/${uuid}`, {
        headers: authHeader(),
    });
};

const getImage = async (image) => {
    return await axios.get(`${API_ENDPOINT}/images/${image}`, {
        headers: authHeader(),
    });
};
const uploadImage = (formData, config) => {
    return axios.post(
        `${API_ENDPOINT}/api/book/uploadImage/`, formData, config)
}
const editImage = (uuid, formData, config) => {
    return axios.post(
        `${API_ENDPOINT}/api/book/uploadImage/${uuid}`,
        formData,
        config
    )
}

const authService = {
    getUsers,
    getBooks,
    getBooksByPage,
    getAuthorsByPage,
    accessToken,
    getAuthors,
    getPublishers,
    getCategories,
    uploadBook,
    deleteBook,
    getBook,
    getImage,
    editImage,
    uploadImage
};

export default authService;
