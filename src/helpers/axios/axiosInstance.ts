import axios from "axios";
import { TGenericErrorResponse, TResponseSuccessType } from "@/types";
import { getFromLocalStorage, setToLocalStorage } from "@/utils/local-storage";
import { authKey } from "@/constant/authKey";
import { getNewAccessToken } from "@/services/actions/getNewAccessToken";
import { store } from "@/redux/store";
import { setToken } from "@/redux/features/user/tokenSlice";

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

    console.log({ResaxiosOk: response});
    console.log({axiosOk: responseObj});
    return responseObj;
},  async function (error) {
    const config = error.config;
    if (error?.response?.status === 500 && !config.sent){
        const response = await getNewAccessToken();
        const accessToken = response?.data;
        config.headers["Authorization"] = accessToken;
        setToLocalStorage(authKey, accessToken);
        store.dispatch(setToken(accessToken));
        config.sent = true;
        return axiosInstance(config);
    }
    else {
        const responseObj: TGenericErrorResponse = {
            statusCode: error?.response?.data?.statusCode || 500,
            message: error?.response?.data?.message || "Something went wrong!",
            errorMessages: error?.response?.data?.errorDetails,
        }
        console.log({axiosError: responseObj});
        return Promise.reject(responseObj);
    }
});

export default axiosInstance;