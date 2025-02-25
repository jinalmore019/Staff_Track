import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const profileApi = createApi({
  reducerPath: "profileApi",
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
  tagTypes: ["Profile"],
  endpoints: (builder) => ({
    getProfileByName: builder.query<any>({
      query: () => `profile`,
      providesTags: ["Profile"],
    }),

    getDesignationByName: builder.query<any>({
      query: () => `designation`,

    }),

    getDepartmentByName: builder.query<any>({
      query: () => `department`,
    }),



    putProfile: builder.mutation<any>({
      query: (profile) => ({
        url: `profile/add`,
        method: "PUT",
        body: profile,
      }),
      invalidatesTags: ["Profile"],
    }),
  }),
});

export const {
  useGetProfileByNameQuery,
  usePutProfileMutation,
  useGetDepartmentByNameQuery,useGetDesignationByNameQuery
} = profileApi;
