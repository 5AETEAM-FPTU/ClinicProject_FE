import { doctorEndpoint } from '@/settings/endpoints'
import { baseApi } from '../base'

export const doctorTreatmentTurnApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getAppointmentOnDay: build.query<any, { date: string }>({
            query: (query) => ({
                url: doctorEndpoint.GET_APPOINTMENTS_ON_DAY.concat(
                    `?startDate=${query.date}`,
                ),
                flashError: true,
                method: 'GET',
                extraOptions: { skipAuth: true },
            }),
            extraOptions: { skipAuth: false },
        }),
        getCancelAppointment: build.query<any, void>({
            query: () => ({
                url: doctorEndpoint.GET_CANCEL_APPOINTMENTS,
                flashError: true,
                method: 'GET',
            }),
        }),
    }),
})

export const { useGetAppointmentOnDayQuery, useGetCancelAppointmentQuery } = doctorTreatmentTurnApi
