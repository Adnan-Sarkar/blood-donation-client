import baseApi from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-types";

const donorApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllDonors: builder.query({
      query: (query: Record<string, any>) => ({
        url: `/donor-list`,
        method: "GET",
        params: query
      }),
      providesTags: [tagTypes.user],
    }),
  }),
});

export const {
  useGetAllDonorsQuery
} = donorApi;