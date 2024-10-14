import axios from "axios";
import { BASE_URL } from "../constants/config";

// Retrieve the token from local storage
const responseString = localStorage.getItem("token");
// console.log(responseString);

const token = responseString;

// Create an Axios instance with base URL and default configurations
const httpClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    authorization: `Bearer ${token}`, // Set the authorization header with the token
  },
});

httpClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

httpClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default httpClient;
