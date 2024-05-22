import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import type { AxiosError, AxiosRequestConfig } from "axios";
import axiosInstance from "@/helpers/axios/axiosInstance";

const axiosBaseQuery =
    (
        { baseUrl }: { baseUrl: string } = { baseUrl: '' }
    ): BaseQueryFn<
        {
            url: string
            method?: AxiosRequestConfig['method'];
            data?: AxiosRequestConfig['data'];
            params?: AxiosRequestConfig['params'];
            headers?: AxiosRequestConfig['headers'];
            contentType?: string;
        },
        unknown,
        unknown
    > =>
        async ({ url, method, data, params, headers, contentType }) => {
            try {
              return await axiosInstance({
                  url: baseUrl + url,
                  method,
                  data,
                  params,
                  headers: {
                    "Content-Type": contentType || "Application/json",
                  },
                });
            } catch (axiosError) {
                const err = axiosError as AxiosError
                return {
                    error: {
                        status: err.response?.status,
                        data: err.response?.data || err.message,
                    },
                }
            }
        }

        export default axiosBaseQuery;