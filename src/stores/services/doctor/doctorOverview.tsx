'use client'
import { doctorEndpoint, userEndpoint } from "@/settings/endpoints";
import { baseApi } from "../base";
import { useGetAppointmentOnDayQuery } from "./doctorTreatmentTurn";

export const doctorOverviewApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        updateDoctorDuty: build.mutation<any, { status: boolean }>({
            query: (params) => ({
                url: doctorEndpoint.UPDATE_DUTY,
                flashError: true,
                method: 'PATCH',
                body: params,
            }),
            extraOptions: { skipAuth: false }
        }),
        getAppointmentInWeek: build.query<any, { startDate: string, endDate: string }>({
            query: (params) => ({
                url: doctorEndpoint.GET_APPOINTMENTS_ON_DAY.concat(
                    `?startDate=${params.startDate}&endDate=${params.endDate}`
                ),
                flashError: true,
                method: 'GET',
            }),
            extraOptions: { skipAuth: false }
        }),
        getRecentAppointments: build.query<any, { size: number }>({
            query: () => ({
                url: doctorEndpoint.GET_RECENT_APPOINTMENTS.concat('?size=2'),
                flashError: true,
                method: 'GET',
            }),
            extraOptions: { skipAuth: false }
        }),
    })
})

export const {
    useUpdateDoctorDutyMutation,
    useGetAppointmentInWeekQuery,
    useGetRecentAppointmentsQuery
} = doctorOverviewApi;