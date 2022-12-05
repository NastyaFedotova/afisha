import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/',
});

export const getApiRequest = (link, body) =>
    api
        .get(link, body)
        .then((res) => {
            console.log(res);
            return res.data;
        })
        .catch((err) => {
            throw JSON.stringify(err.response?.data);
        });
