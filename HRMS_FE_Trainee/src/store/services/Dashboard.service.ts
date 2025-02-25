import { useAuth } from "@/Context/ContextToken";
import { useAuth } from "@/Context/ContextToken";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { prepareHeaders } from "./Utils";
// import {BASE_URL} from "../../config/config"
// const createCustomFetch = (token) => {
//     return async (url, options) => {
//         // Add token to the headers
//         const headers = {
//             ...options.headers,
//             Authorization: `Bearer ${token}`,
//         };
//         // Return the result of the default fetch function with the modified headers
//         return fetch(url, { ...options, headers });
//     };
// };
// const token =  useAuth();
// baseUrl: config,

export const dashboardApi = createApi({

  reducerPath: "dashboardApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/",
    prepareHeaders: prepareHeaders
  }),
  tagTypes: ["time"],
  endpoints: (builder) => ({
    getNoticeByName: builder.query<any>({
      query: () => `notice`,
    }),
    getBoxData: builder.query<any>({
      query: () => `dashboard`,
    }),
    getreportingTime: builder.query<any>({
      query: () => {
        return {
          url: "/userlog/reporting-time",
        };
      },
      providesTags: ["time"],
    }),
    getBreakingTime: builder.query<any>({
      query: () => {
        return {
          url: "/userlog/breaking-time",
        };
      },
      providesTags: ["time"],
    }),
    startTime: builder.mutation<any>({
      query: () => ({
        url: `/userlog/start-time`,
        method: "POST",
      }),
      invalidatesTags: ["time"],
    }),
    CheckOut: builder.mutation<any>({
      query: (i) => ({
        url: `/logout`,
        method: "POST",
        body:i
      }),
      invalidatesTags: ["time"],
    }),
    StopTime: builder.mutation<any>({
      query: () => ({
        url: `/userlog/stop-time`,
        method: "POST",
      }),
      invalidatesTags: ["time"],
    }),
  }),
});

export const { useGetNoticeByNameQuery, useGetBoxDataQuery, useGetreportingTimeQuery, useGetBreakingTimeQuery ,useStartTimeMutation, useCheckOutMutation ,useStopTimeMutation} = dashboardApi;
