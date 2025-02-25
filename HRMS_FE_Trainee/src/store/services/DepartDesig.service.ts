import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const deptDesigApi = createApi({
  reducerPath: "deptDesigApi",
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
  tagTypes: ["Dept", "Desig"],
  endpoints: (builder) => ({
    getDesignationByName: builder.query<any>({
      query: () => `designation`,
      providesTags: ["Desig"],
    }),
    getDepartmentByName: builder.query<any>({
      query: () => `department`,
      providesTags: ["Dept"],
    }),
    postDepart: builder.mutation<any>({
      query: (dept) => ({ url: `department/add`, method: "POST", body: dept }),
      invalidatesTags: ["Dept"],
    }),
    putDepart: builder.mutation<any>({
      query: (i) => ({
        url: `department/update/${i?.id}`,
        method: "PUT",
        body: i?.data,
      }),
      invalidatesTags: ["Dept"],
    }),
    deleteDepart: builder.mutation<any>({
      query: ({ i, ...dept }) => ({
        url: `department/delete/${i}`,
        method: "DELETE",
        body: dept,
      }),
      invalidatesTags: ["Dept"],
    }),

    postDesig: builder.mutation<any>({
      query: (desig) => ({
        url: `designation/add`,
        method: "POST",
        body: desig,
      }),
      invalidatesTags: ["Desig"],
    }),
    putDesig: builder.mutation<any>({
      query: (i) => ({
        url: `designation/update/${i?.id}`,
        method: "PUT",
        body: i?.data,
      }),
      invalidatesTags: ["Desig"],
    }),
    deleteDesig: builder.mutation<any>({
      query: ({ i, ...desig }) => ({
        url: `designation/delete/${i}`,
        method: "DELETE",
        body: desig,
      }),
      invalidatesTags: ["Desig"],
    }),
  }),
});

export const {
  useGetDepartmentByNameQuery,
  useGetDesignationByNameQuery,
  usePostDepartMutation,
  useDeleteDepartMutation,
  usePutDepartMutation,
  useDeleteDesigMutation,
  usePostDesigMutation,
  usePutDesigMutation,
} = deptDesigApi;
