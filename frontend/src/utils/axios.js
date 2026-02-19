import axios from 'axios'
import Cookies from 'js-cookie';



const apiInstance = axios.create({
    baseURL: "http://127.0.0.1:8000/api/v1/",
    timeout: 5000,

    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
    }
})

// Add a request interceptor to include Authorization header
apiInstance.interceptors.request.use(async (config) => {
    const accessToken = Cookies.get('access_token');

    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
}, (error) => {
    // Do something with request error
    return Promise.reject(error);
});



export default apiInstance 