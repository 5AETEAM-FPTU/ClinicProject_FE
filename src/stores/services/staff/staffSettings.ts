'use client'
import { doctorEndpoint, userEndpoint } from "@/settings/endpoints";
import { baseApi } from "../base";
import { DoctorProfileTypes } from "@/components/Core/modules/Doctor/DoctorSettingsModule";

export const staffSettingsApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getStaffProfile: build.query<any, void>({
            query: () => ({
                url: doctorEndpoint.GET_PROFILE,
                flashError: true,
                method: 'GET',
                extraOptions: { skipAuth: true }
            }),
            extraOptions: { skipAuth: false }
        }),
        updateStaffPrivateInformation: build.mutation<any, any>({
            query: (data: DoctorProfileTypes) => ({
                url: doctorEndpoint.PATCH_PRIVATE_INFOR,
                flashError: true,
                method: 'PATCH',
                body: data,
            }),
            extraOptions: { skipAuth: false }
        }),
        updateStaffDescription: build.mutation<any, { description: string }>({
            query: (params: { description: string }) => ({
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
        updateStaffAchievement: build.mutation<any, { achievement: string }>({
            query: (params: { achievement: string }) => ({
                url: doctorEndpoint.PATCH_ACHIEVEMENT,
                flashError: true,
                method: 'PATCH',
                body: {
                    achievement: params.achievement
                },
                extraOptions: { skipAuth: false }
            }),
            extraOptions: { skipAuth: false }
        }),
        getStaffGetAllDoctor: build.query<any, { pageIndex: number, pageSize: number, keyWord: string }>({
            query: (query) => ({
                url: doctorEndpoint.GET_ALL_DOCTOR + '?pageIndex=' + query.pageIndex + '&pageSize=' + query.pageSize + '&keyWord=' + query.keyWord,
                flashError: true,
                method: 'GET',
                extraOptions: { skipAuth: false }
            }),
            extraOptions: { skipAuth: false }
        }),
        getAllPatient: build.query<any, { pageIndex: number, pageSize: number, keyword: string }>({
            query: (query) => ({
                url: doctorEndpoint.GET_ALL_PATIENT + '?pageIndex=' + query.pageIndex + '&pageSize=' + query.pageSize + '&keyword=' + query.keyword,
                flashError: true,
                method: 'GET',
                extraOptions: { skipAuth: false }
            }),
            extraOptions: { skipAuth: false }
        })
    })
})

export const {
    useGetStaffProfileQuery,
    useUpdateStaffPrivateInformationMutation,
    useUpdateStaffAchievementMutation,
    useUpdateStaffDescriptionMutation,
    useGetStaffGetAllDoctorQuery,
    useLazyGetStaffGetAllDoctorQuery,
    useLazyGetAllPatientQuery,
} = staffSettingsApi;