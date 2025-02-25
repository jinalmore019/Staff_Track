
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import {BASE_URL} from "../../config/config"
export const loginApi = createApi({
    reducerPath: "loginApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/" }),
    endpoints: (builder) => ({
        postLogin: builder.mutation<any>({
            query: (log) => ({ url: `login`, method: "POST", body: log }),
            // invalidatesTags: ["Dept"],
        }),
    }),
});


export const { usePostLoginMutation } = loginApi;
