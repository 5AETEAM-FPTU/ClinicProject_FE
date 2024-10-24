'use client'
import { doctorEndpoint, userEndpoint } from '@/settings/endpoints'
import { baseApi } from '../base'

export const doctorSettingsApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getAllFeedbacks: build.query<
            any,
            {
                pageIndex: string
                pageSize: string
                vote?: string
            }
        >({
            query: (params) => {
                let url = `${doctorEndpoint.GET_ALL_FEEDBACKS}?pageIndex=${params.pageIndex}&pageSize=${params.pageSize}`
                if (params.vote && params.vote.trim()) {
                    url += `&vote=${params.vote}`
                }
                return {
                    url: url,
                    flashError: true,
                    method: 'GET',
                    extraOptions: { skipAuth: true },
                }
            },
            extraOptions: { skipAuth: false },
        }),
    }),
})

export const { useGetAllFeedbacksQuery } = doctorSettingsApi
