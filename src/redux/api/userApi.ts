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
        url: `/auth/change-password/`,
        method: "POST",
        data
      }),
    }),

    getAllUsers: builder.query({
      query: (query: Record<string, any>) => ({
        url: `/users`,
        method: "GET",
        params: query
      }),
      providesTags: [tagTypes.user],
    }),

    updateUserStatus: builder.mutation({
      query: (data) => ({
        url: `/users/${data.id}`,
        method: "PUT",
        data: {
          status: data.status
        }
      }),
      invalidatesTags: [tagTypes.user],
    }),

  })
});

export const {
  useLoggedInUserQuery,
  useUpdateUserInfoMutation,
  useChangePasswordMutation,
  useGetAllUsersQuery,
  useUpdateUserStatusMutation
} = userApi;