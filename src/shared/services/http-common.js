import axios from "axios";
import {authenticationInterceptor} from "@/iam/services/authentication.interceptor.js";

//const API_BASE_URL = 'https://my-json-server.typicode.com/G2-AplicacionesWeb-SI91';
const API_BASE_URL = 'https://localhost:7202/api/v1/';

/**
 * Axios instance
 * @summary http axios instance creation with default configs
 * @type {axios.AxiosInstance}
 */

const http = axios.create({
    baseURL: API_BASE_URL,
    headers: {'Content-type': 'application/json'}
});

http.defaults.headers.common['Content-type'] = 'application/json';
http.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
http.interceptors.request.use(authenticationInterceptor);

export default http;