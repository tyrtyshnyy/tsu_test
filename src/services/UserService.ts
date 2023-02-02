import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { IDeleteUser, IUser } from "../models/IUser";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl:
      "https://superlative-belekoy-52ab8b.netlify.app/.netlify/functions/index/",
  }),
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
    editUser: build.mutation<IUser, IUser>({
      query: (user) => ({
        url: `users`,
        method: "PUT",
        body: user,
      }),
      invalidatesTags: ["User"],
    }),
    deleteUsers: build.mutation<IDeleteUser, IDeleteUser>({
      query: (users) => ({
        url: `users/`,
        method: "DELETE",
        body: users,
      }),
      invalidatesTags: ["User"],
    }),
    deleteUser: build.mutation<IUser, number>({
      query: (id) => ({
        url: `users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useFetchAllUsersQuery,
  useFetchOneUserQuery,
  useAddUserMutation,
  useEditUserMutation,
  useDeleteUsersMutation,
  useDeleteUserMutation,
} = userApi;
