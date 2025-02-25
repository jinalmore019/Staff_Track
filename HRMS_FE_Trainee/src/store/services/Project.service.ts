import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const projectApi = createApi({
  reducerPath: "projectApi",
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
  tagTypes: ["Project"],
  endpoints: (builder) => ({
    getProjectByName: builder.query<any>({
      query: () => `project`,
      providesTags: ["Project"],
    }),
    postProject: builder.mutation<any>({
      query: (project) => ({
        url: `project/add`,
        method: "POST",
        body: project,
      }),
      invalidatesTags: ["Project"],
    }),
    putProject: builder.mutation<any>({
      query: ({ id, ...project }) => ({
        url: `project/update/${id}`,
        method: "PUT",
        body: project,
      }),
      invalidatesTags: ["Project"],
    }),
    deleteProject: builder.mutation<any>({
      query: ({ id, ...project }) => ({
        url: `project/delete/${id}`,
        method: "DELETE",
        body: project,
      }),
      invalidatesTags: ["Project"],
    }),
  }),
});

export const {
  useGetProjectByNameQuery,
  usePostProjectMutation,
  usePutProjectMutation,
  useDeleteProjectMutation,
} = projectApi;
