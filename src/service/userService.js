import axios from "axios";
import API_ENDPOINT from "../Helpers/API_URL";
import authHeader from "./authHeader";

// const local = "http:localhost:8000";

// const uploadImage = () => { };

const accessToken = JSON.parse(localStorage.getItem("data")).token;
// const accessToken = "TempToken";

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
        `http://104.248.39.111/api/books/paginate/${perPageInput}?page=${pageNumber}`,
        { headers: authHeader() }
    );
};

const getAuthorsByPage = async (pageNumber, perPageInput) => {
    return await axios.get(
        `${API_ENDPOINT}/api/authors/paginate/${perPageInput}?page=${pageNumber}`,
        { headers: authHeader() }
    );
};

const getAuthors = async (perPage) => {
    return await axios.get(`http://104.248.39.111/api/authors/paginate/10`, {
        headers: authHeader(),
    });
};

const getPublishers = async () => {
    return await axios.get("http://104.248.39.111/api/publishers", {
        headers: authHeader(),
    });
};

const getCategories = async () => {
    return await axios.get("http://104.248.39.111/api/categories", {
        headers: authHeader(),
    });
};

const uploadBook = (uuid, data) => {
    return axios.post(`http://104.248.39.111/api/book/add/${uuid}`, data, {
        headers: authHeader(),
        "Content-Type": "application/json",
    });
};

const uploadAuthor = (data) => {
    return axios.post(`${API_ENDPOINT}/api/author/add`, data, { headers: authHeader() })
}

const deleteBook = (uuid) => {
    return axios.delete(`http://104.248.39.111/api/book/${uuid}`, {
        headers: authHeader(),
    });
};

const getBook = (uuid) => {
    return axios.get(`http://104.248.39.111/api/book/${uuid}`, {
        headers: authHeader(),
    });
};

const getImage = async (image) => {
    return await axios.get(`http://104.248.39.111/images/${image}`, {
        headers: authHeader(),
    });
};

const uploadAuthorImage = (id, formData, config) => {
    return axios.post(`${API_ENDPOINT}/api/author/${id}/uploadImage`, formData, config)
}

const deleteAuthor = (id) => {
    return axios.delete(`${API_ENDPOINT}/api/author/${id}`, { headers: authHeader() });
}

const getAuthorById = async (id) => {
    return await axios.get(`${API_ENDPOINT}/api/author/${id}`, { headers: authHeader() })
}
const updateAuthor = (id, data) => {
    return axios.post(`${API_ENDPOINT}/api/author/update/${id}`, data, { headers: authHeader() })
}
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
    uploadImage,
    getAuthors,
    uploadAuthor,
    uploadAuthorImage,
    deleteAuthor,
    getAuthorById,
    updateAuthor
};

export default authService;
