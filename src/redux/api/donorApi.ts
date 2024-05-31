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
      providesTags: [tagTypes.donors],
    }),

    getDonorDetails: builder.query({
      query: (donorId: string) => ({
        url: `/donor-details/${donorId}`,
        method: "GET",
      }),
      providesTags: [tagTypes.donors],
    }),

    createDonationRequest: builder.mutation({
      query: (data) => ({
        url: `/donation-request`,
        method: "POST",
        data
      }),
      invalidatesTags: [tagTypes.donors],
    }),

    checkDonationRequest: builder.query({
      query: (query: Record<string, any>) => ({
        url: `/donation-request/check-donation-request`,
        method: "GET",
        params: query
      }),
      providesTags: [tagTypes.donors],
    }),

  }),
});

export const {
  useGetAllDonorsQuery,
  useGetDonorDetailsQuery,
  useCreateDonationRequestMutation,
  useCheckDonationRequestQuery
} = donorApi;