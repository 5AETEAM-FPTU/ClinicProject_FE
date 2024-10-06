'use client'
import { scheduleEndpoint, userEndpoint } from '@/settings/endpoints'
import { baseApi } from '../base'
import { TimeSlot } from '@/components/Core/modules/Doctor/DoctorUpdateSchedules/TimeSlot'

export const scheduleSettingsApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getScheduleByDate: build.query<any, { date: string; doctorId: string }>(
            {
                query: (params) => ({
                    url: `${scheduleEndpoint.GET_SCHEDULES_BY_DATE}?date=${params.date}&doctorId=${params.doctorId}`,
                    flashError: true,
                    method: 'GET',
                }),
            },
        ),
        createSchedules: build.mutation<any, TimeSlot[]>({
            query: (data: TimeSlot[]) => ({
                url: scheduleEndpoint.POST_CREATE_SCHEDULES,
                flashError: true,
                method: 'POST',
                body: { timeSlots: data },
            }),
        }),
        getScheduleByMonth: build.query<
            any,
            { month: number; year: number; doctorId: string }
        >({
            query: (params) => ({
                url: `${scheduleEndpoint.GET_SCHEDULES_BY_MONTH}?month=${params.month}&year=${params.year}&doctorId=${params.doctorId}`,
                flashError: true,
                method: 'GET',
            }),
            extraOptions: { skipAuth: false },
        }),
    }),
})

export const {
    useGetScheduleByDateQuery,
    useCreateSchedulesMutation,
    useGetScheduleByMonthQuery,
} = scheduleSettingsApi
