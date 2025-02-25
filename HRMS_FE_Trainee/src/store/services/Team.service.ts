import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const teamManagementApi = createApi({
  reducerPath: "teamManagementApi",
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
  tagTypes: ["Team"],
  endpoints: (builder) => ({
    getTeamByName: builder.query<any>({
      query: () => `team`,
      providesTags: ["Team"],
    }),
    getEmployeeByName: builder.query<any>({
      query: () => `company/view-employee`,
    }),
    getProjectByName: builder.query<any>({
      query: () => `project`,
    }),
    postTeam: builder.mutation<any>({
      query: (team) => ({
        url: `team/add`,
        method: "POST",
        body: team,
      }),
      invalidatesTags: ["Team"],
    }),
    putTeam: builder.mutation<any>({
      query: ({ id, ...team }) => ({
        url: `team/update/${id}`,
        method: "PUT",
        body: team,
      }),
      invalidatesTags: ["Team"],
    }),
    deleteTeam: builder.mutation<any>({
      query: ({ id, ...team }) => ({
        url: `team/delete/${id}`,
        method: "DELETE",
        body: team,
      }),
      invalidatesTags: ["Team"],
    }),
  }),
});

export const {
  usePostTeamMutation,
  usePutTeamMutation,
  useDeleteTeamMutation,
  useGetTeamByNameQuery,
  useGetEmployeeByNameQuery,
  useGetProjectByNameQuery,
} = teamManagementApi;
