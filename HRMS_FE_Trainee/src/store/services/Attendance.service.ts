import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const attendanceApi = createApi({
  reducerPath: "attendanceApi",
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
    getEmpAttendance:builder.query<any>({
      query:()=>`userlog/attendance`
    }),
    getCmpEmpAttendance:builder.query<any>({
      query:(i)=>`userlog/attendance/${i}`
    }
      )
  }),
});

export const { useGetEmpByNameQuery,useGetEmpAttendanceQuery ,useGetCmpEmpAttendanceQuery} = attendanceApi;
