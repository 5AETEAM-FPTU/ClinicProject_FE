'use client'
import { medicineOrderEndpoint } from '@/settings/endpoints'
import { baseApi } from '../base'

export const medicalReportApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getMedicineOrderById: build.query<any, string>({
            query: (id) => ({
                url: `${medicineOrderEndpoint.GET_MEDICINE_ORDER_DETAIL}?medicineOrderId=${id}`,
                method: 'GET',
                flashError: true,
            }),
        }),
        updateMedicineOrderItem: build.mutation<
            any,
            {
                medicineOrderId: string
                medicineId: string
                quantity: string
                description: string
            }
        >({
            query: (data) => ({
                url: medicineOrderEndpoint.UPDATE_MEDICINE_ORDER_ITEM,
                method: 'PATCH',
                body: data,
                flashError: true,
            }),
        }),
        addMedicineOrderItem: build.mutation<
            any,
            {
                medicineOrderId: string
                medicineId: string
            }
        >({
            query: (data) => ({
                url: medicineOrderEndpoint.ADD_MEDICINE_ORDER_ITEM,
                method: 'POST',
                body: data,
                flashError: true,
            }),
        }),
        deleteMedicineOrderItem: build.mutation<
            any,
            {
                medicineOrderId: string
                medicineId: string
            }
        >({
            query: (data) => ({
                url: medicineOrderEndpoint.DELETE_MEDICINE_ORDER_ITEM.replace(
                    '{:medicineOrderId}',
                    data.medicineOrderId,
                ).replace('{:medicineId}', data.medicineId),
                method: 'DELETE',
                flashError: true,
            }),
        }),
        getAllMedicineAvailable: build.query<any, { medicineName: string }>({
            query: ({ medicineName }) => ({
                url: medicineOrderEndpoint.GET_MEDICINE_AVAILABLE,
                method: 'GET',
                params: { medicineName },
                flashError: true,
            }),
        }),
        updateMedicineOrderNote: build.mutation<
            any,
            {
                medicineOrderId: string
                note:string
            }
        >({
            query: (data) => ({
                url: medicineOrderEndpoint.UPDATE_MEDICINE_NOTE,
                method: 'PATCH',
                body: data,
                flashError: true,
            }),
        }),
    }),
})

export const {
    useGetMedicineOrderByIdQuery,
    useUpdateMedicineOrderItemMutation,
    useAddMedicineOrderItemMutation,
    useDeleteMedicineOrderItemMutation,
    useGetAllMedicineAvailableQuery,
    useUpdateMedicineOrderNoteMutation
} = medicalReportApi
