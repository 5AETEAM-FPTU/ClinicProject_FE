'use client'
import { scheduleEndpoint, userEndpoint } from '@/settings/endpoints'
import { baseApi } from '../base'
import { TimeSlot } from '@/components/Core/modules/Doctor/DoctorUpdateSchedules/TimeSlot'

export const scheduleSettingsApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getScheduleByDate: build.query<any, { date: string, doctorId?: string }>({
            query: (query) => ({
                url: `${scheduleEndpoint.GET_SCHEDULES_BY_DATE}?&date=${query.date}${query.doctorId && `&doctorId=${query.doctorId}`}`,
                flashError: true,
                method: 'GET',
            }),
        }),
        createSchedules: build.mutation<any, TimeSlot[]>({
            query: (data: TimeSlot[]) => ({
                url: scheduleEndpoint.POST_CREATE_SCHEDULES,
                flashError: true,
                method: 'POST',
                body: { timeSlots: data },
            }),
        }),
        getScheduleByMonth: build.query<any, { month: number, year: number, doctorId?: string | null }>({
            query: (params) => ({
                url: `${scheduleEndpoint.GET_SCHEDULES_BY_MONTH}?month=${params.month}&year=${params.year}${params.doctorId && (`&doctorId=${params.doctorId}`)}`,
                flashError: true,
                method: 'GET',
            }),
            extraOptions: { skipAuth: false },
        }),
        getGuestScheduleByMonth: build.query<any, { month: number, year: number, doctorId: string | null }>({
            query: (params) => ({
                url: `${scheduleEndpoint.GET_SCHEDULES_GUEST_BY_MONTH}?month=${params.month}&year=${params.year}${params.doctorId && (`&doctorId=${params.doctorId}`)}`,
                flashError: true,
                method: 'GET',
            }),
            extraOptions: { skipAuth: false },
        }),
        getGuestScheduleByDate: build.query<any, { date: string, doctorId: string }>({
            query: (query) => ({
                url: `${scheduleEndpoint.GET_SCHEDULES_GUEST_BY_DATE}?&date=${query.date}${query.doctorId && `&doctorId=${query.doctorId}`}`,
                flashError: true,
                method: 'GET',
            }),
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
        updateScheduleById: build.mutation<any, { schedularId: string, startDate: string, endDate: string }>({
            query: (data: { schedularId: string, startDate: string, endDate: string }) => ({
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
    useGetScheduleByDateQuery, useLazyGetScheduleByDateQuery,
    useCreateSchedulesMutation,
    useGetScheduleByMonthQuery,
    useRemoveScheduleByDateMutation,
    useRemoveScheduleByIdMutation,
    useUpdateScheduleByIdMutation,
    useLazyGetGuestScheduleByDateQuery,
    useGetGuestScheduleByMonthQuery,
} = scheduleSettingsApi
