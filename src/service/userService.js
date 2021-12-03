import axios from "axios";
import API_URL from "../Helpers/API_URL";
import authHeader from "./authHeader";

// const local = "http:localhost:8000";
const API_ENDPOINT = API_URL.API_ENDPOINT
// const uploadImage = () => { };
let accessToken = '';
if (JSON.parse(localStorage.getItem("data"))) {
    accessToken = JSON.parse(localStorage.getItem("data")).token;
}
// const accessToken = "TempToken";

const getUsers = async (perPage) => {
    return await axios.get(`${API_ENDPOINT}/api/users/${perPage}`, {
        headers: authHeader(),
    });
};

const getBooks = async (perPage) => {
    return await axios.get(`${API_ENDPOINT}/api/books/paginate/${perPage}`, {
        headers: authHeader(),
    });
};

const getAllBooks = async () => {
    return await axios.get(`${API_ENDPOINT}/api/books`, { headers: authHeader() })
}

const getAllUsers = async () => {
    return await axios.get(`${API_ENDPOINT}/api/users/100000`, { headers: authHeader() })
}

const getBooksByPage = async (pageNumber, perPageInput) => {
    return await axios.get(
        `${API_ENDPOINT}/api/books/paginate/${perPageInput}?page=${pageNumber}`,
        { headers: authHeader() }
    );
};

const getAuthorsByPage = async (pageNumber, perPageInput) => {
    return await axios.get(
        `${API_ENDPOINT}/api/authors/paginate/${perPageInput}?page=${pageNumber}`,
        { headers: authHeader() }
    );
};

const getAuthorsInPaginate = async (perPage) => {
    return await axios.get(`${API_ENDPOINT}/api/authors/paginate/${perPage}`, {
        headers: authHeader(),
    });
};

const getAuthors = async () => {
    return await axios.get(`${API_ENDPOINT}/api/authors/`, {
        headers: authHeader(),
    });
};

const getPublishersByPage = async (pageNumber, perPageInput) => {
    return await axios.get(
        `${API_ENDPOINT}/api/publishers/paginate/${perPageInput}?page=${pageNumber}`,
        { headers: authHeader() }
    );
};

const getPublishersInPaginate = async (perPage) => {
    return await axios.get(`${API_ENDPOINT}/api/publishers/paginate/${perPage}`, {
        headers: authHeader(),
    });
};

const getPublisherById = async (id) => {
    return await axios.get(`${API_ENDPOINT}/api/publisher/${id}`, {
        headers: authHeader(),
    });
};

const getPublishers = async () => {
    return await axios.get(`${API_ENDPOINT}/api/publishers/`, {
        headers: authHeader(),
    });
};

const uploadPublisher = (data) => {
    return axios.post(`${API_ENDPOINT}/api/publisher/add`, data, { headers: authHeader() })
}

const updatePublisher = (id, data) => {
    return axios.post(`${API_ENDPOINT}/api/publisher/update/${id}`, data, { headers: authHeader() })
}

const deletePublisher = (id) => {
    return axios.delete(`${API_ENDPOINT}/api/publisher/${id}`, { headers: authHeader() });
}

const getCategoriesByPage = async (pageNumber, perPageInput) => {
    return await axios.get(
        `${API_ENDPOINT}/api/categories/paginate/${perPageInput}?page=${pageNumber}`,
        { headers: authHeader() }
    );
};

const getCategoriesInPaginate = async (perPage) => {
    return await axios.get(`${API_ENDPOINT}/api/categories/paginate/${perPage}`, {
        headers: authHeader(),
    });
};

const getCategoryById = async (id) => {
    return await axios.get(`${API_ENDPOINT}/api/category/${id}`, {
        headers: authHeader(),
    });
};

const getCategories = async () => {
    return await axios.get(`${API_ENDPOINT}/api/categories/`, {
        headers: authHeader(),
    });
};

const uploadCategory = (data) => {
    return axios.post(`${API_ENDPOINT}/api/category/add`, data, { headers: authHeader() })
}

const updateCategory = (id, data) => {
    return axios.post(`${API_ENDPOINT}/api/category/update/${id}`, data, { headers: authHeader() })
}

const deleteCategory = (id) => {
    return axios.delete(`${API_ENDPOINT}/api/category/${id}`, { headers: authHeader() });
}

const getUsersByPage = async (pageNumber, perPageInput) => {
    return await axios.get(
        `${API_ENDPOINT}/api/users/paginate/${perPageInput}?page=${pageNumber}`,
        { headers: authHeader() }
    );
};

const deleteUser = (id) => {
    return axios.delete(`${API_ENDPOINT}/api/user/${id}`, { headers: authHeader() });
}

const uploadBook = (uuid, data) => {
    return axios.post(`${API_ENDPOINT}/api/book/add/${uuid}`, data, {
        headers: authHeader(),
        "Content-Type": "application/json",
    });
};

const uploadAuthor = (data) => {
    return axios.post(`${API_ENDPOINT}/api/author/add`, data, { headers: authHeader() })
}

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

// const getImage = async (image) => {
//     return await axios.get(`${API_URL.STORAGE_ENDPOINT}/images/${image}`, {
//         headers: authHeader(),
//     });
// };

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
    getPublishers,
    uploadBook,
    deleteBook,
    getBook,
    // getImage,
    editImage,
    uploadImage,
    getAuthors,
    uploadAuthor,
    uploadAuthorImage,
    deleteAuthor,
    getAuthorById,
    updateAuthor,
    getAuthorsInPaginate,
    getPublishersByPage,
    getPublishersInPaginate,
    deletePublisher,
    uploadPublisher,
    getPublisherById,
    updatePublisher,
    getCategoriesByPage,
    getCategoryById,
    getCategories,
    getCategoriesInPaginate,
    updateCategory,
    uploadCategory,
    deleteCategory,
    deleteUser,
    getUsersByPage,
    getAllBooks,
    getAllUsers
};

export default authService;
