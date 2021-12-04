const API_ENDPOINT = 'http://172.31.8.188:9090';
const STORAGE_ENDPOINT = 'http://172.31.13.113:90/books';
const STORAGE_ENDPOINT_AUTHORS = 'http://172.31.13.113:90/authors';
// const API_ENDPOINT = process.env.REACT_APP_NGINX_BACKEND;

// image: {`${API_URL.STORAGE_ENDPOINT}/${book.id}/${book.imageLocation}`}
// file : {`${API_URL.STORAGE_ENDPOINT}/${book.id}/${book.fileLocation}`}

export default { API_ENDPOINT, STORAGE_ENDPOINT, STORAGE_ENDPOINT_AUTHORS };
