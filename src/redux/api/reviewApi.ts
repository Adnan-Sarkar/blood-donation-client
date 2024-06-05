import baseApi from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-types";

const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createReview: builder.mutation({
      query: (data) => ({
        url: `/review`,
        method: "POST",
        data
      }),
      invalidatesTags: [tagTypes.review],
    }),

    getUserReview: builder.query({
      query: () => ({
        url: `/review`,
        method: "GET",
      }),
      providesTags: [tagTypes.review, tagTypes.user],
    }),

    getAllReviews: builder.query({
      query: () => ({
        url: `/review/all-reviews`,
        method: "GET",
      }),
      providesTags: [tagTypes.review, tagTypes.user],
    }),

  })
});

export const {
  useCreateReviewMutation,
  useGetUserReviewQuery,
  useGetAllReviewsQuery
} = reviewApi;