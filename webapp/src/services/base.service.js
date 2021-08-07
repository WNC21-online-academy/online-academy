import axios from 'axios';

const baseURL = 'http://localhost:4000/api/v1';

export const axiosInstance = axios.create({
  baseURL,
  timeout: 5000,
  headers: {
    'X-Access-Token': 'accessToken' //
  }
})
