import axios from 'axios'
import { useRouter } from 'vue-router'
import { API_URL } from '../utils/contants'
import useRefreshToken from '../utils/refresh-token'

const baseURL = API_URL
const router = useRouter()

const instance = axios.create({
  baseURL,
  timeout: 5000
})

// attach access token to headers if exist 
instance.interceptors.request.use(
  function (config) {
    const token = localStorage.onlineAcademy_accessToken
    if (token) {
      config.headers["X-Access-Token"] = token;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
)

// Check acces token expire when call any api
instance.interceptors.response.use(null, async function (error) {
  if (error.response?.status === 401) {
    const { authenticated } = await useRefreshToken()
    console.log('authenticated :>> ', authenticated);
    if (!authenticated) {
      router.push('/sign-in')
      return
    }
    return instance(error.config)
  }
  return Promise.reject(error);
});

export const axiosInstance = instance