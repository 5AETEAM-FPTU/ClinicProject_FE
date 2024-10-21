'use client'
import { userEndpoint } from "@/settings/endpoints";
import { baseApi } from "../base";
import { UserProfileTypes } from "@/components/Core/modules/User";


export const userAppointments = baseApi.injectEndpoints({
    endpoints: (build) => ({
        changeProfileAvatar: build.mutation<any, { avatarUrl: string }>({
            query: (params) => ({
                url: userEndpoint.CHANGE_AVATAR,
                body: {
                    avatar: params.avatarUrl
                },
                flashError: true,
                method: 'PATCH',
                extraOptions: { skipAuth: false }
            }),
        }),
        getAllDoctorForBooking: build.query<any, { doctorName?: string, doctorGender?: string, doctorSpecialtyId?: string, pageIndex: number }>({
            query: (params) => ({
                url: userEndpoint.GET_DOCTORS_FOR_APPOINTMENT + "?" +
                    `${params.doctorName ? `doctorName=${params.doctorName}&` : ''}` +
                    `${params.doctorGender ? `doctorGender=${params.doctorGender}&` : ''}` +
                    `${params.doctorSpecialtyId ? `doctorSpecialtyId=${params.doctorSpecialtyId}&` : ''}` +
                    `pageSize=1&pageIndex=${params.pageIndex}`
                ,
                flashError: true,
                method: 'GET',
                extraOptions: { skipAuth: false }
            }),
        }),
        getBookedAppointments: build.query<any, void>({
            query: () => ({
                url: userEndpoint.GET_BOOKED_APPOINTMENTS,
                flashError: true,
                method: 'GET',
                extraOptions: { skipAuth: false }
            }),
        }),
        updateBookedAppointment: build.mutation<any, { appointmentId: string, selectedSlotId: string }>({
            query: (params) => ({
                url: userEndpoint.UPDATE_BOOKED_APPOINTMENT,
                body: {
                    appointmentId: params.appointmentId,
                    selectedSlotId: params.selectedSlotId
                },
                flashError: true,
                method: 'PATCH',
                extraOptions: { skipAuth: false }
            }),
        }),
        getAppointmentUpcoming: build.query<any, void>({
            query: () => ({
                url: userEndpoint.GET_UPCOMING_DATE,
                flashError: true,
                method: 'GET',
                extraOptions: { skipAuth: false }
            }),
        }),
        createAnAppointment: build.mutation<any, { scheduleId: string, description: string, reExamination: boolean }>({
            query: (params) => ({
                url: userEndpoint.CREATE_AN_APPOINTMENT,
                flashError: true,
                method: 'POST',
                body: {
                    ...params,
                    depositPayment: false,
                    examinationDate: new Date().toISOString(),
                },
                extraOptions: { skipAuth: false }
            }),
        }),
        createFeedback: build.mutation<any, { comment: string, vote: number, appointmentId: string }>({
            query: (params) => ({
                url: userEndpoint.CREATE_FEEDBACK,
                flashError: true,
                method: 'POST',
                body: {
                    ...params,
                },
                extraOptions: { skipAuth: false }
            }),
        })
    })
})

export const {
    useChangeProfileAvatarMutation,
    useGetAllDoctorForBookingQuery, useLazyGetAllDoctorForBookingQuery,
    useGetBookedAppointmentsQuery,
    useUpdateBookedAppointmentMutation,
    useGetAppointmentUpcomingQuery,
    useCreateAnAppointmentMutation,
    useCreateFeedbackMutation
} = userAppointments;