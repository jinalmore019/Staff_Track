import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const toggleLogAPi = createApi({
  reducerPath: "toggleLogAPi",
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
    getEmp: builder.query<any>({
      query: () => `company/view-employee`,
    }),
    
    getToggle: builder.query<any>({
      query: (start,end) => `toggleLog?startDate=${start}&endDate=${end}`,
    }),
  }),
});

export const { useGetEmpQuery, useGetToggleQuery } = toggleLogAPi;
