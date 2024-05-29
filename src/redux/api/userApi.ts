import baseApi from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-types";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    loggedInUser: builder.query({
      query: () => ({
        url: `/my-profile`,
        method: "GET",
      }),
      providesTags: [tagTypes.user],
    }),

    updateUserInfo: builder.mutation({
      query: (data) => ({
        url: `/my-profile/`,
        method: "PUT",
        data
      }),
      invalidatesTags: [tagTypes.user]
    }),

    changePassword: builder.mutation({
      query: (data) => ({
        url: `/change-password/`,
        method: "POST",
        data
      }),
    }),
  })
});

export const {
  useLoggedInUserQuery,
  useUpdateUserInfoMutation,
  useChangePasswordMutation
} = userApi;