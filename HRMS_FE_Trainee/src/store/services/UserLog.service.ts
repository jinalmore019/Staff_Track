import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const UserLogAPi = createApi({
  reducerPath: "UserLogAPi",
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
    GetAllUserLog: builder.query<any>({
      query: () => `/userlog/log`,
    }),
    
  }),
});

export const { useGetAllUserLogQuery } = UserLogAPi;
