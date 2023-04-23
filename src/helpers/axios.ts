import axios from 'axios'

export const Axios = axios.create({
    baseURL: process.env.VUE_APP_API_ENDPOINT
});