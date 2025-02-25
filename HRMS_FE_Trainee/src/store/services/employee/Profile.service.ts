import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const profileApi = createApi({
  reducerPath: "profileApi",
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
  tagTypes: ["Profile"],
  endpoints: (builder) => ({
    getProfileByName: builder.query<any>({
      query: () => `profile`,
      providesTags: ["Profile"],
    }),

    getDesignationByName: builder.query<any>({
      query: () => `designation`,
    }),

    getDepartmentByName: builder.query<any>({
      query: () => `department`,
    }),

    putProfile: builder.mutation<any>({
      query: (profile) => ({
        url: `profile/edit-profile`,
        method: "put",
        body: profile,
      }),
      invalidatesTags: ["Profile"],
    }),
    
    postVerifyEmail: builder.mutation<any>({
      query: (email) => ({
        url: `company/verify-email`,
        method: "POST",
        body: email,
      }),
    }),
    postVerifyOtp: builder.mutation<any>({
      query: (otp) => ({
        url: `company/verify-otp`,
        method: "POST",
        body: otp,
      }),
    }),
    postChangePassword: builder.mutation<any>({
      query: (changePassword) => ({
        url: `profile/change-password`,
        method: "POST",
        body: changePassword,
      }),
    }),
  }),
});

export const {
  useGetProfileByNameQuery,
  usePutProfileMutation,
  useGetDepartmentByNameQuery,
  useGetDesignationByNameQuery,
  usePostVerifyEmailMutation,
  usePostVerifyOtpMutation,
  usePostChangePasswordMutation,
} = profileApi;
