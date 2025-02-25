import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const userManagementApi = createApi({
  reducerPath: "userManagementApi",
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
  tagTypes: ["User", "Dept", "Desig"],
  endpoints: (builder) => ({
    getEmployeeByName: builder.query<any>({
      query: () => `company/view-employee`,
      providesTags: ["User"],
    }),
    getDesignationByName: builder.query<any>({
      query: () => `designation`,
      // providesTags: ["Desig"],
    }),
    getDepartmentByName: builder.query<any>({
      query: () => `department`,
      // providesTags: ["Dept"],
    }),
    postEmployee: builder.mutation<any>({
      query: (emp) => ({
        url: `company/add-employee`,
        method: "POST",
        body: emp,
      }),
      invalidatesTags: ["User"],
    }),
    putEmployee: builder.mutation<any>({
      query: ({ id, ...emp }) => ({
        url: `company/update-employee/${id}`,
        method: "PUT",
        body: emp,
      }),
      invalidatesTags: ["User"],
    }),
    deleteEmployee: builder.mutation<any>({
      query: ({ id, ...emp }) => ({
        url: `company/delete-employee/${id}`,
        method: "DELETE",
        body: emp,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
//
export const {
  useGetEmployeeByNameQuery,
  useGetDesignationByNameQuery,
  useGetDepartmentByNameQuery,
  usePostEmployeeMutation,
  usePutEmployeeMutation,
  useDeleteEmployeeMutation,
} = userManagementApi;
