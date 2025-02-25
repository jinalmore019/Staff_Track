import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const leaveManagementApi = createApi({
  reducerPath: "leaveManagementApi",
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
    getLeaveByName: builder.query<any>({
      query: () => `leave`,
      providesTags: ["Leave"],
    }),
    postLeave: builder.mutation<any>({
      query: (leave) => ({ url: `leave/add`, method: "POST", body: leave }),
      invalidatesTags: ["Leave"],
    }),
    putLeave: builder.mutation<any>({
      query: ({ id, ...leave }) => ({
        url: `leave/update/${id}`,
        method: "PUT",
        body: leave,
      }),
      invalidatesTags: ["Leave"],
    }),
    deleteLeave: builder.mutation<any>({
      query: ({ id, ...leave }) => ({
        url: `leave/delete/${id}`,
        method: "DELETE",
        body: leave,
      }),
      invalidatesTags: ["Leave"],
    }),
  }),
});

export const {
  useGetLeaveByNameQuery,
  usePostLeaveMutation,
  usePutLeaveMutation,
  useDeleteLeaveMutation,
} = leaveManagementApi;
