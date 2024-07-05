import Axios from 'axios';
const { ENV } = require('./constants');

const axios = Axios.create({
    baseURL: ENV.BASE_API_URL,
});

export default axios;