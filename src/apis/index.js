import axios from 'axios';

const BASE_URL = "https://api-dev.thepicmeapp.com/api/v1"

axios.defaults.baseURL = BASE_URL;

const setApiHeader = async () => {
    axios.defaults.headers.common.Authorization = localStorage.getItem("token");
};

export const postApiWithoutAuth = async (url, body) => {
    try {
        const res = await axios.post(url, body);
        return {
            data: res.data,
            status: res.status,
            success: true,
            headers: res.headers,
        };
    } catch (err) {
        return { data: err.response.data, success: false };
    }
}

export const postApiWithAuth = async (url, body) => {
    try {
        setApiHeader()
        const res = await axios.post(url, body);
        return {
            data: res.data,
            status: res.status,
            success: true,
            headers: res.headers,
        };
    } catch (err) {
        return { data: err.response.data, success: false };
    }
}

export const getApiWithAuth = async (url) => {
    try {
        setApiHeader()
        const res = await axios.get(url);

        return {
            data: res.data,
            status: res.status,
            success: true,
            headers: res.headers,
        };
    } catch (err) {
        return { data: err.response.data, success: false };
    }
}