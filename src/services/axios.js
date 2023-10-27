import axios from "axios"

export const base_url = "https://c669-180-151-24-64.ngrok-free.app/api/v1/admin"

const Axiosintance = axios.create({
  baseURL:base_url
})
Axiosintance.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
Axiosintance.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    return Promise.reject(error);
  });

export default Axiosintance