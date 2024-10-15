'use client'

import { baseApi } from '../base'

export const appointmentApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        updateAppointmentStatus: build.mutation<any, { appointmentId: string, statusId: string }>({
            query: (body) => ({
                url: 'appointment/update-status',
                flashError: true,
                method: 'PATCH',
                body: {
                    appointmentId: body.appointmentId,
                    appointmentStatusId: body.statusId
                },
            }),
        }),
    }),
})

export const {
    useUpdateAppointmentStatusMutation
} = appointmentApi
