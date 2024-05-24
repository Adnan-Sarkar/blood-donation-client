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
    })
  })
});

export const {
  useLoggedInUserQuery
} = userApi;