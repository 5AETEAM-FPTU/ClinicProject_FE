import { generatePdfEndpoint } from '@/settings/endpoints'
import { formServiceBaseApi } from '../formServiceBase'

export const generatePdfApis = formServiceBaseApi.injectEndpoints({
    endpoints: (build) => ({
        getGeneralMedicalReportPdf: build.mutation<any, any>({
            query: (data) => ({
                url: generatePdfEndpoint.GENERAL_PDF,
                method: 'POST',
                body: data,
            }),
        }),
        getAdominalUltrasoundPdf: build.mutation<any, any>({
            query: (data) => ({
                url: generatePdfEndpoint.ADOMINAL_PDF,
                method: 'POST',
                body: data,
            }),
        }),
        getElectrocarDiographyPdf: build.mutation<any, any>({
            query: (data) => ({
                url: generatePdfEndpoint.ELECTROCAR_PDF,
                method: 'POST',
                body: data,
            }),
        }),
        getMedicineReportPdf: build.mutation<any, any>({
            query: (data) => ({
                url: generatePdfEndpoint.PRINT_MEDICINE_LIST,
                method: 'POST',
                body: data,
            }),
        }),
        getServiceReportPdf: build.mutation<any, any>({
            query: (data) => ({
                url: generatePdfEndpoint.PRINT_SERVICE_LIST,
                method: 'POST',
                body: data,
            }),
        })
    }),
})

export const {
    useGetGeneralMedicalReportPdfMutation,
    useGetAdominalUltrasoundPdfMutation,
    useGetElectrocarDiographyPdfMutation,
    useGetMedicineReportPdfMutation,
    useGetServiceReportPdfMutation,
} = generatePdfApis
