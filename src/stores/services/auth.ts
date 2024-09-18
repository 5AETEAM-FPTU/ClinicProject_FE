'use client'
import { baseApi } from "./base";
import { authEndpoint } from "@/settings/endpoints";
export const authApis = baseApi.injectEndpoints({
    endpoints: (build) => ({
        requestLogin: build.mutation<any, { username: string, password: string, isRemember: boolean }>({
            query: (params) => ({
                url: authEndpoint.SIGNIN,
                body: {
                    username: params.username,
                    password: params.password,
                    isRemember: params.isRemember
                },
                flashError: true,
                method: 'POST',
            }),
            extraOptions: { skipAuth: true }
        }),
        requestForgetPassword: build.mutation<any, { email: string }>({
            query: (params) => ({
                url: authEndpoint.FORGET_PASSWORD,
                body: {
                    email: params.email
                },
                flashError: true,
                method: 'POST',

            }),
            extraOptions: { skipAuth: true }
        }),
        requestChangePassword: build.mutation<any, { newPassword: string, resetPasswordToken: string, email: string }>({
            query: (params) => ({
                url: authEndpoint.CHANGE_PASSWORD,
                body: {
                    newPassword: params.newPassword,
                    resetPasswordToken: params.resetPasswordToken,
                    email: params.email
                },
                flashError: true,
                method: 'PATCH',

            }),
            extraOptions: { skipAuth: true }
        }),
        requestConfirmEmail: build.query<any, { token: string }>({
            query: (params) => ({
                url: authEndpoint.CONFIRM_EMAIL + `?token=${params.token}`,
                flashError: true,
                method: 'GET',

            }),
            extraOptions: { skipAuth: true }
        }),
        requestLogout: build.mutation<any, any>({
            query: (params) => ({
                url: authEndpoint.LOGOUT,
                flashError: true,
                method: 'POST',

            }),
            extraOptions: { skipAuth: false }
        }),
        requestSignUp: build.mutation<any, { fullName: string, phoneNumber: string, email: string, password: string }>({
            query: (params) => ({
                url: authEndpoint.SIGNUP,
                body: {
                    fullName: params.fullName,
                    phoneNumber: params.phoneNumber,
                    email: params.email,
                    password: params.password
                },
                flashError: true,
                method: 'POST',

            }),
            extraOptions: { skipAuth: true }
        }),
    }),
})

export const {
    useRequestLoginMutation,
    useRequestChangePasswordMutation,
    useRequestForgetPasswordMutation,
    useLazyRequestConfirmEmailQuery,
    useRequestLogoutMutation,
    useRequestSignUpMutation,
} = authApis;