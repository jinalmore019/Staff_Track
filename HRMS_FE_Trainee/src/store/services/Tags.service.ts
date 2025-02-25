import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const tagsApi = createApi({
  reducerPath: "tagsApi",
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
  tagTypes: ["Tags"],
  endpoints: (builder) => ({
    getTagsByName: builder.query<any>({
      query: () => `tags`,
      providesTags: ["Tags"],
    }),
    postTags: builder.mutation<any>({
      query: (tags) => ({ url: `tags/add`, method: "POST", body: tags }),
      invalidatesTags: ["Tags"],
    }),
    deleteTags: builder.mutation<any>({
      query: ({ id, ...tags }) => ({
        url: `tags/delete/${id}`,
        method: "DELETE",
        body: tags,
      }),
      invalidatesTags: ["Tags"],
    }),
  }),
});

export const {
 useGetTagsByNameQuery,
 usePostTagsMutation,
 useDeleteTagsMutation
} = tagsApi;
