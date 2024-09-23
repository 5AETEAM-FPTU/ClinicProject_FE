'use client'
import { doctorEndpoint, userEndpoint } from "@/settings/endpoints";
import { baseApi } from "../base";
import { DoctorProfileTypes } from "@/components/Core/modules/Doctor/DoctorSettingsModule";

export const doctorSettingsApi = baseApi.injectEndpoints({
     endpoints: (build) => ({
        getDoctorProfile: build.query<any, void>({
            query: () => ({
                url: doctorEndpoint.GET_PROFILE,
                flashError: true,
                method: 'GET',
                extraOptions: { skipAuth: true }
            }),
            extraOptions: { skipAuth: false }
        }),
        updateDoctorPrivateInformation: build.mutation<any, any>({
            query: (data: DoctorProfileTypes) => ({
                url: doctorEndpoint.PATCH_PRIVATE_INFOR,
                flashError: true,
                method: 'PATCH',
                body: data,
            }),
            extraOptions: { skipAuth: false }
        }),
        updateDoctorDescription: build.mutation<any, {description: string}>({
            query: (params: {description: string} ) => ({
                url: doctorEndpoint.PATCH_DESCRIPTION,
                flashError: true,
                method: 'PATCH',
                body: {
                    description: params.description
                },
                extraOptions: { skipAuth: true }
            }),
            extraOptions: { skipAuth: false }
        }),
        updateDoctorAchievement: build.mutation<any, {achievement: string}>({
            query: (params: {achievement: string} ) => ({
                url: doctorEndpoint.PATCH_ACHIEVEMENT,
                flashError: true,
                method: 'PATCH',
                body: {
                    achievement: params.achievement
                },
                extraOptions: { skipAuth: true }
            }),
            extraOptions: { skipAuth: false }
        }),
     })
})

export const {
    useGetDoctorProfileQuery,
    useUpdateDoctorPrivateInformationMutation,
    useUpdateDoctorDescriptionMutation,
    useUpdateDoctorAchievementMutation
} = doctorSettingsApi;