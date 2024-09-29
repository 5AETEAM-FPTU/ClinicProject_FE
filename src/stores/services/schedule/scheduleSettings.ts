'use client'
import { scheduleEndpoint, userEndpoint } from "@/settings/endpoints";
import { baseApi } from "../base";

export const scheduleSettingsApi = baseApi.injectEndpoints({
     endpoints: (build) => ({
        getScheduleByDate: build.query<any, any>({
            query: () => ({
                url: scheduleEndpoint.GET_SCHEDULES_BY_DATE.replace('{date}', "2024-09-28T08:30:00"),
                flashError: true,
                method: 'GET',
            }),
        }),
        createSchedules: build.mutation<any, any>({
            query: (data: []) => ({
                url: scheduleEndpoint.POST_CREATE_SCHEDULES,
                flashError: true,
                method: 'POST',
                body: data,
            }),
        }),
     })
})

export const {
    useGetScheduleByDateQuery,
    useCreateSchedulesMutation,
} = scheduleSettingsApi;