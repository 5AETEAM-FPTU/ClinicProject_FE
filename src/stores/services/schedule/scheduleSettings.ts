'use client'
import { scheduleEndpoint, userEndpoint } from "@/settings/endpoints";
import { baseApi } from "../base";
import { TimeSlot } from "@/components/Core/modules/Doctor/DoctorUpdateSchedules/TimeSlot";
import { time } from "console";

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
            extraOptions: { skipAuth: false }
        }),
    })
})

export const {
    useGetScheduleByDateQuery, useLazyGetScheduleByDateQuery,
    useCreateSchedulesMutation,
    useGetScheduleByMonthQuery
} = scheduleSettingsApi;