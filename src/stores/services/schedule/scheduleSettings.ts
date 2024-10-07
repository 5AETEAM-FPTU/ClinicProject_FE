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
        removeScheduleById: build.mutation<any, string>({
            query: (id: string) => ({
                url: `${scheduleEndpoint.REMOVE_SCHEDULE_BY_ID.replace('{scheduleId}', id)}`,
                flashError: true,
                method: 'DELETE',
            }),
        }),
        removeScheduleByDate: build.mutation<any, string>({
            query: (date: string) => ({
                url: `${scheduleEndpoint.REMOVE_SCHEDULE_BY_DATE.replace("{date}", date)}`,
                flashError: true,
                method: 'DELETE',
            }),
        }),
        updateScheduleById: build.mutation<any, {schedularId: string, startDate: string, endDate: string}>({
            query: (data: {schedularId: string, startDate: string, endDate: string}) => ({
                url: `${scheduleEndpoint.UPDATE_SCHEDULE_BY_ID.replace('{scheduleId}', data.schedularId)}`,
                flashError: true,
                body: {
                    startDate: data.startDate,
                    endDate: data.endDate
                },
                method: 'PATCH',
            }),
        })
    }),
})

export const {
    useGetScheduleByDateQuery,
    useCreateSchedulesMutation,
    useGetScheduleByMonthQuery,
    useRemoveScheduleByDateMutation,
    useRemoveScheduleByIdMutation,
    useUpdateScheduleByIdMutation
} = scheduleSettingsApi
