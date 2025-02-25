import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const salaryApi = createApi({
  reducerPath: "salaryApi",
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
  endpoints: (builder) => ({
    getEmpByName: builder.query<any>({
      query: () => `company/view-employee`,
    }),
    getEmpSalary:builder.query<any>({
      query: () => `userlog/salary`,
    })
  }),
});

export const { useGetEmpByNameQuery,useGetEmpSalaryQuery } = salaryApi;
