import { useAuth } from "@/Context/ContextToken";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const empToggleApi = createApi({
  reducerPath: "empToggleApi",
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
  tagTypes: ["ToggleLog"],
  endpoints: (builder) => ({
    getProjectByName: builder.query<any>({
      query: () => `project`,
    }),
    getTagByName: builder.query<any>({
      query: () => `tags`,
    }),
    getToggleLog: builder.query<any>({
      query: () => `toggleLog`,
      providesTags: ["ToggleLog"],
    }),
    postToggleLog: builder.mutation<any>({
      query: (toggle) => ({
        url: `toggleLog/add`,
        method: "POST",
        body: toggle,
      }),
      invalidatesTags: ["ToggleLog"],
    }),
    putToggleLog: builder.mutation<any>({
      query: (i, ...toggle) => ({
        url: `toggleLog/update/${i}`,
        method: "PUT",
        body: toggle,
      }),
      invalidatesTags: ["ToggleLog"],
    }),
    deleteToggleLog: builder.mutation<any>({
      query: (id, ...toggle) => ({
        url: `toggleLog/delete/${id}`,
        method: "DELETE",
        body: toggle,
      }),
      invalidatesTags: ["ToggleLog"],
    }),
  }),
});

export const {
  useGetProjectByNameQuery,
  useGetTagByNameQuery,
  usePostToggleLogMutation,
  useGetToggleLogQuery,
  usePutToggleLogMutation,
  useDeleteToggleLogMutation,
} = empToggleApi;
