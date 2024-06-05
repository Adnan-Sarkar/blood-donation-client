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

    getDonationRequestStatus: builder.query({
      query: (query: Record<string, any>) => ({
        url: `/donation-request/donation-request-status`,
        method: "GET",
        params: query
      }),
      providesTags: [tagTypes.donors],
    }),

    getMyBloodRequests: builder.query({
      query: (query: Record<string, any>) => ({
        url: `/donation-request/my-donation-requests`,
        method: "GET",
        params: query
      }),
      providesTags: [tagTypes.requests],
    }),

    getMyReceivedRequests: builder.query({
      query: (query: Record<string, any>) => ({
        url: `/donation-request/my-donor-requests`,
        method: "GET",
        params: query
      }),
      providesTags: [tagTypes.requests],
    }),

    updateReceivedRequest: builder.mutation({
      query: (data) => ({
        url: `/donation-request/${data.id}`,
        method: "PUT",
        data: {
          status: data.status
        }
      }),
      invalidatesTags: [tagTypes.requests],
    }),

    completeReceivedRequest: builder.mutation({
      query: (data) => ({
        url: `/donation-request/complete/${data.id}`,
        method: "PUT",
      }),
      invalidatesTags: [tagTypes.requests],
    }),

  }),
});

export const {
  useGetAllDonorsQuery,
  useGetDonorDetailsQuery,
  useCreateDonationRequestMutation,
  useCheckDonationRequestQuery,
  useGetMyBloodRequestsQuery,
  useGetMyReceivedRequestsQuery,
  useUpdateReceivedRequestMutation,
  useGetDonationRequestStatusQuery,
  useCompleteReceivedRequestMutation
} = donorApi;