import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import {BASE_URL} from "../../config/config"
export const checkIn_OutApi = createApi({
  reducerPath: "checkIn_OutApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/" }),
  endpoints: (builder) => ({
    getreportingTime: builder.query<any>({
      query: () => {
        return {
          url: "/userlog/reporting-time",
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

export const {
  useGetreportingTimeQuery,
  useStartTimeMutation,
  useCheckOutMutation,
  useStopTimeMutation,
} = checkIn_OutApi;
