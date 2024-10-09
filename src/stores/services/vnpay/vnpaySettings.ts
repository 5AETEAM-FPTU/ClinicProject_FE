import { baseApi } from '../base'
import build from 'next/dist/build'
import { VnPayEndpoint } from '@/settings/endpoints'

export const vnpaySettingsApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getVnPayUrl: build.mutation<
            any,
            { description: string; amount: number; slotId: string }
        >({
            query: (payload) => ({
                url: VnPayEndpoint.CREATE_VNPAY_URL,
                flashError: true,
                method: 'POST',
                body: payload,
            }),
        }),
    }),
})

export const { useGetVnPayUrlMutation } = vnpaySettingsApi
