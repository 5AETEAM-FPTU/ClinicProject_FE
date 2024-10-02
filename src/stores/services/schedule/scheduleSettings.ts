'use client'
import { scheduleEndpoint, userEndpoint } from "@/settings/endpoints";
import { baseApi } from "../base";
import { TimeSlot } from "@/components/Core/modules/Doctor/DoctorUpdateSchedules/TimeSlot";
import { time } from "console";

export const scheduleSettingsApi = baseApi.injectEndpoints({
     endpoints: (build) => ({
        getScheduleByDate: build.query<any, any>({
            query: (date: string) => ({
                url: scheduleEndpoint.GET_SCHEDULES_BY_DATE.replace('{date}', date),
                flashError: true,
                method: 'GET',
            }),
        }),
        createSchedules: build.mutation<any, TimeSlot[]>({
            query: (data: TimeSlot[]) => ({
                url: scheduleEndpoint.POST_CREATE_SCHEDULES,
                flashError: true,
                method: 'POST',
                body: {timeSlots: data},
            }),
        }),
     })
})

export const {
    useGetScheduleByDateQuery,
    useCreateSchedulesMutation,
} = scheduleSettingsApi;