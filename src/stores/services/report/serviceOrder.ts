import { serviceOrderEndpoint } from '@/settings/endpoints'
import { baseApi } from '../base'

export const serviceOrderApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        addServiceOrder: build.mutation<
            any,
            {
                serviceOrderId: string
                serviceIds: string[]
            }
        >({
            query: (data) => ({
                url: serviceOrderEndpoint.SERVICE_ORDER_ADD,
                method: 'POST',
                body: data,
            }),
        }),
        getServiceOrderDetail: build.query<any, string>({
            query: (id) => ({
                url: `${serviceOrderEndpoint.SERVICE_ORDER_DETAIL}?serviceOrderId=${id}`,
                method: 'GET',
            }),
        }),
        updateServiceOrderStatusItem: build.mutation<
            any,
            {
                serviceOrderId: string
                serviceId: string
            }
        >({
            query: (data) => ({
                url: '',
                method: 'PATCH',
                body: data,
            }),
        }),
    }),
})

export const { useAddServiceOrderMutation, useGetServiceOrderDetailQuery } =
    serviceOrderApi
