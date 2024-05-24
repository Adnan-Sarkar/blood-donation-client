import axios from "axios";
import {TGenericErrorResponse, TResponseSuccessType} from "@/types";
import { getFromLocalStorage } from "@/utils/local-storage";
import { authKey } from "@/constant/authKey";

const axiosInstance = axios.create();

axiosInstance.defaults.headers.post["Content-Type"] = "application/json";
axiosInstance.defaults.headers["Accept"] = "application/json";
axiosInstance.defaults.timeout = 60000;

// Add a request interceptor
axiosInstance.interceptors.request.use(function (config) {
    const accessToken = getFromLocalStorage(authKey);
    if (accessToken) {
        config.headers.Authorization = accessToken;
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});

// Add a response interceptor
// @ts-ignore
axiosInstance.interceptors.response.use(function (response: any) {
    const responseObj: TResponseSuccessType = {
        success: response?.success,
        statusCode: response?.statusCode,
        message: response?.message,
        data: response?.data?.data || response?.data,
        meta: response?.data?.meta,
    };

    return responseObj;
}, function (error) {
    const responseObj: TGenericErrorResponse = {
        statusCode: error?.response?.data?.statusCode || 500,
        message: error?.response?.data?.message || "Something went wrong!",
        errorMessages: error?.response?.data?.message,
    };

    return responseObj;
});

export default axiosInstance;