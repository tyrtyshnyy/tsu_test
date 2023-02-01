import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { IUser } from "../models/IUser";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://jovial-snickerdoodle-b85d1f.netlify.app/.netlify/functions/index/" }),
  tagTypes: ["User"],
  endpoints: (build) => ({
    fetchAllUsers: build.query<IUser[], string>({
      query: () => ({
        url: "users",
      }),
      providesTags: ["User"],
    }),
    fetchOneUser: build.query<IUser, string>({
      query: (id) => ({
        url: `users/${id}`,
      }),
      providesTags: ["User"],
    }),
    addUser: build.mutation<IUser, IUser>({
      query: (user) => ({
        url: `users`,
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useFetchAllUsersQuery,
  useFetchOneUserQuery,
  useAddUserMutation,
} = userApi;
