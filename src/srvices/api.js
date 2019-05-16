import axios from 'axios';

const API = 'http://localhost:3200'

const get = (path) => {
    return axios.get(`${API}/${path}`);
}

const post = (path, data) => {
    return axios.post(`${API}/${path}`, data);
}

const put = (path, data) => {
    return axios.put(`${API}/${path}`, data);
}

const api = {
    post,
    get,
    put
}
export default api; 