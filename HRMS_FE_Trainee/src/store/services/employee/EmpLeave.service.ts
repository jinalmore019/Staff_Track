import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const empLeaveApi = createApi({
  reducerPath: "empLeaveApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/",
    prepareHeaders: (headers) => {
      const token = sessionStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ["Leave"],
  endpoints: (builder) => ({
    getLeave: builder.query<any>({
      query: () => `leave`,
      providesTags: ["Leave"],
    }),
    postLeave: builder.mutation<any>({
      query: (leave) => ({
        url: `leave/add`,
        method: "POST",
        body: leave,
      }),
      invalidatesTags: ["Leave"],
    }),
    putLeave: builder.mutation<any>({
      query: (i) => ({
        url: `leave/update/${i?.id}`,
        method: "PUT",
        body: i?.data || {},
      }),
      invalidatesTags: ["Leave"],
    }),
    deleteLeave: builder.mutation<any>({
      query: (id, ...leave) => ({
        url: `leave/delete/${id}`,
        method: "DELETE",
        body: leave,
      }),
      invalidatesTags: ["Leave"],
    }),
  }),
});

export const {
  useGetLeaveQuery,
  usePutLeaveMutation,
  useDeleteLeaveMutation,
  usePostLeaveMutation,
} = empLeaveApi;
