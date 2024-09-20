'use client'
import { demoEnpoints, userEndpoint } from "@/settings/endpoints";
import { baseApi } from "../base";
import build from "next/dist/build";
import { UserProfileTypes } from "@/components/Core/modules/User";


export const userSettingsApi = baseApi.injectEndpoints({
     endpoints: (build) => ({
         changeProfileAvatar: build.mutation<any, {avatarUrl: string}>({
             query: (params) => ({
                 url: userEndpoint.CHANGE_AVATAR,
                 body: {
                     avatar: params.avatarUrl
                 },
                 flashError: true,
                 method: 'PATCH',
                 extraOptions: { skipAuth: false }
             }),
         }),
         getUserProfile: build.query<any, void>({
            query: () => ({
                url: userEndpoint.GET_PROFILE,
                flashError: true,
                method: 'GET',
                extraOptions: { skipAuth: true }
            }),
            extraOptions: { skipAuth: false }
        }),
        updateUserPrivateInformation: build.mutation<any, any>({
            query: (data: UserProfileTypes) => ({

                url: userEndpoint.PATCH_PRIVATE_INFOR,
                flashError: true,
                method: 'PATCH',
                body: data,
            }),
        }),
        updateUserDescription: build.mutation<any, {description: string}>({
            query: (params: {description: string} ) => ({
                url: userEndpoint.PATCH_DESCRIPTION,
                flashError: true,
                method: 'PATCH',
                body: {
                    description: params.description
                },
            }),
            extraOptions: { skipAuth: false }
        }),
     })
})

export const {
    useChangeProfileAvatarMutation,
    useGetUserProfileQuery,
    useUpdateUserPrivateInformationMutation,
    useUpdateUserDescriptionMutation
} = userSettingsApi;