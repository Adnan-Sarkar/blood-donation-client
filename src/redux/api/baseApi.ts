
import { createApi } from '@reduxjs/toolkit/query/react'
import axiosBaseQuery from "@/helpers/axios/axiosBaseQuery";
import { tagTypesList } from "@/redux/tag-types";

export const baseApi = createApi({
    reducerPath: 'api',
    baseQuery: axiosBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL as string }),
    endpoints: () => ({}),
    tagTypes: tagTypesList,
});

export default baseApi;