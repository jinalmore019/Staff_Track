import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const organizationApi = createApi({
  reducerPath: "organizationApi",
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
  tagTypes: ["Cmp"],
  endpoints: (builder) => ({
    getCompanyByName: builder.query<any>({
      query: () => `company/view-company`,
      providesTags: ["Cmp"],
    }),
    getWorkCategoryByName: builder.query<any>({
      query: () => `work-category`,
    }),
    putCmp: builder.mutation<any>({
      query: (cmp) => ({
        url: `company/update-company`,
        method: "PUT",
        body: cmp,
      }),
      invalidatesTags: ["Cmp"],
    }),
  }),
});

export const {
  useGetCompanyByNameQuery,
  usePutCmpMutation,
  useGetWorkCategoryByNameQuery,
} = organizationApi;
