import { baseApi } from "./baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/api/v1/auth/login/",
        method: "POST",
        body: {
          identifier: credentials.email || credentials.identifier,
          password: credentials.password,
        },
      }),
      invalidatesTags: ["User"],
    }),
    register: builder.mutation({
      query: (userData) => {
        // Split name into first_name and last_name for backend requirements
        const fullName = (userData.name || "").trim();
        const parts = fullName.split(/\s+/);
        const first_name = parts[0] || "User";
        const last_name = parts.slice(1).join(" ") || "Gourmet";

        return {
          url: "/api/v1/auth/register/",
          method: "POST",
          body: {
            first_name,
            last_name,
            email: userData.email,
            password: userData.password,
          },
        };
      },
    }),
    verifyOtp: builder.mutation({
      query: (payload) => ({
        url: "/api/v1/auth/verify-registration-otp/",
        method: "POST",
        body: {
          email: payload.email,
          otp: payload.otp,
        },
      }),
    }),
    resendOtp: builder.mutation({
      query: (payload) => ({
        url: "/api/v1/auth/resend-registration-otp/",
        method: "POST",
        body: {
          email: payload.email,
        },
      }),
    }),
    resetPassword: builder.mutation({
      query: (payload) => ({
        url: "/api/v1/auth/reset-password/",
        method: "POST",
        body: payload,
      }),
    }),
    getMe: builder.query({
      query: () => "/api/v1/auth/me/",
      providesTags: ["User"],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useVerifyOtpMutation,
  useResendOtpMutation,
  useResetPasswordMutation,
  useGetMeQuery,
  useLazyGetMeQuery,
} = authApi;
