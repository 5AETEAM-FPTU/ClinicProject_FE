'use client'

import { get } from 'lodash'
import { baseApi } from '../base'
import { AppointmentEndpoint } from '@/settings/endpoints'
export const appointmentApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        updateAppointmentStatus: build.mutation<any, { appointmentId: string, statusId: string }>({
            query: (body) => ({
                url: AppointmentEndpoint.UPDATE_APPOINTMENT_STATUS,
                flashError: true,
                method: 'PATCH',
                body: {
                    appointmentId: body.appointmentId,
                    appointmentStatusId: body.statusId
                },
            }),
        }),
        getAllUserFollowUpAppointment: build.query<any, { pageIndex: number, pageSize: number, keyword: string }>({
            query: (query) => ({
                url: AppointmentEndpoint.GET_ALL_USER_FOLLOW_UP_APPOINTMENT + `?pageIndex=${query.pageIndex}&pageSize=${query.pageSize}&keyword=${query.keyword}`,
                flashError: true,
                method: 'GET',
            }),
        }),
        getUserDetailInMedicalReport: build.query<any, { userId: string }>({
            query: (query) => ({
                url: AppointmentEndpoint.GET_USER_DETAIL_IN_FOLLOW_UP.replace('{userId}', query.userId),
                flashError: true,
                method: 'GET',
            }),
        }),
        getRecentAbsentAppointment: build.query<any, void>({
            query: () => ({
                url: AppointmentEndpoint.GET_RECENT_ABSENT_APPOINTMENTS,
                flashError: true,
                method: 'GET',
            }),
        }),
        getRecentPendingAppointment: build.query<any, void>({
            query: () => ({
                url: AppointmentEndpoint.GET_RECENT_PENDING_APPOINTMENTS,
                flashError: true,
                method: 'GET',
            }),
        }),
    }),
})

export const {
    useUpdateAppointmentStatusMutation,
    useGetAllUserFollowUpAppointmentQuery,
    useLazyGetAllUserFollowUpAppointmentQuery,
    useGetUserDetailInMedicalReportQuery,
    useGetRecentAbsentAppointmentQuery,
    useGetRecentPendingAppointmentQuery,
} = appointmentApi
