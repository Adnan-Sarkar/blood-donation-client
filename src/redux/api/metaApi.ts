import baseApi from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-types";

const metaApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMetaData: builder.query({
      query: () => ({
        url: `/meta-data`,
        method: "GET",
      }),
      providesTags: [tagTypes.metaData],
    }),
  })
});

export const {
  useGetMetaDataQuery
} = metaApi;