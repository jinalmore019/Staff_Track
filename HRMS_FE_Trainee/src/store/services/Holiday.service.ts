import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const holidayManagementApi = createApi({
  reducerPath: "holidayManagementApi",
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
  tagTypes: ["Holiday"],
  endpoints: (builder) => ({
    getHolidayByName: builder.query<any>({
      query: () => `holiday`,
      providesTags: ["Holiday"],
    }),
    postHoliday: builder.mutation<any>({
      query: (day) => ({ url: `holiday/add`, method: "POST", body: day }),
      invalidatesTags: ["Holiday"],
    }),
    putHoliday: builder.mutation<any>({
      query: ({ id, ...day }) => ({
        url: `holiday/update/${id}`,
        method: "PUT",
        body: day,
      }),
      invalidatesTags: ["Holiday"],
    }),
    deleteHoliday: builder.mutation<any>({
      query: ({ id, ...day }) => ({
        url: `holiday/delete/${id}`,
        method: "DELETE",
        body: day,
      }),
      invalidatesTags: ["Holiday"],
    }),
  }),
});

export const {
  useGetHolidayByNameQuery,
  usePostHolidayMutation,
  usePutHolidayMutation,
  useDeleteHolidayMutation,
} = holidayManagementApi;
