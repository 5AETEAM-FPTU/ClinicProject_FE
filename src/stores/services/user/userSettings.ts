'use client'
import { demoEnpoints, userEndpoint } from "@/settings/endpoints";
import { baseApi } from "../base";
import build from "next/dist/build";


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
         })
     })
})

export const {
    useChangeProfileAvatarMutation
} = userSettingsApi;