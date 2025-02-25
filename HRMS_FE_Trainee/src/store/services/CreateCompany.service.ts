
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import {BASE_URL} from "../../config/config"
export const createCompanyApi = createApi({
    reducerPath: "createCompanyApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/" }),
    endpoints: (builder) => ({
        getWorkCategory: builder.query<any>({
            query: () => `work-category`,

        }),
        postCompany: builder.mutation<any>({
            query: (cmp) => ({ url: `company/add-company`, method: "POST" ,headers: {
                "Content-Type": "multipart/form-data"
            }, body: cmp}),
        }),

    }),
});


export const { usePostCompanyMutation,useGetWorkCategoryQuery } = createCompanyApi;
