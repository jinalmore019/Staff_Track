import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const noticeApi = createApi({
  reducerPath: "noticeApi",
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
  tagTypes: ["Notice"],
  endpoints: (builder) => ({
    getNoticeByName: builder.query<any>({
      query: () => `notice`,
      providesTags: ["Notice"],
    }),
    postNotice: builder.mutation<any>({
      query: (notice) => ({ url: `notice/add`, method: "POST", body: notice }),
      invalidatesTags: ["Notice"],
    }),
    putNotice: builder.mutation<any>({
      query: ({ id, ...notice }) => ({
        url: `notice/update/${id}`,
        method: "PUT",
        body: notice,
      }),
      invalidatesTags: ["Notice"],
    }),
    deleteNotice: builder.mutation<any>({
      query: ({ id, ...notice }) => ({
        url: `notice/delete/${id}`,
        method: "DELETE",
        body: notice,
      }),
      invalidatesTags: ["Notice"],
    }),
  }),
});

export const {
  useGetNoticeByNameQuery,
  usePostNoticeMutation,
  usePutNoticeMutation,
  useDeleteNoticeMutation,
} = noticeApi;
