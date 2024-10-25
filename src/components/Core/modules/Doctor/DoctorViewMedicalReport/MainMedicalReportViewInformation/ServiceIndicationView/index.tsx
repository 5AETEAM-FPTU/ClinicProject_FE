import { Button } from 'antd'
import { LucideView } from 'lucide-react'
import { useGetServiceOrderDetailQuery } from '@/stores/services/report/serviceOrder'
import { useEffect } from 'react'

export default function ServiceIndication({ payload }: any) {
    const serviceId = payload?.serviceOrderId

    const { service, refetch, isFetching } = useGetServiceOrderDetailQuery(
        serviceId!,
        {
            selectFromResult: ({ data, isFetching }) => ({
                service: data?.body?.serviceOrder ?? {},
                isFetching: isFetching,
            }),
        },
    )

    useEffect(() => {
        refetch()
    }, [])
    
    return (
        <>
            <div className="mt-5 max-w-[900px] overflow-y-auto rounded-xl bg-[#FFFFFF] p-4 shadow-third">
                <table className="min-w-full bg-[#FFFFFF] text-[#003553]">
                    <thead>
                        <tr className="bg-[#FFFFFF] text-center">
                            <th className="border-b border-r border-[#003553] px-4 py-2">
                                STT
                            </th>
                            <th className="border-b border-r border-[#003553] px-4 py-2">
                                Mã xét nghiệm
                            </th>
                            <th className="border-b border-r border-[#003553] px-4 py-2">
                                Tên xét nghiệm
                            </th>
                            <th className="border-b border-r border-[#003553] px-4 py-2">
                                Đơn giá
                            </th>
                            <th className="border-b border-[#003553] px-4 py-2">
                                Xem kết quả
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {service?.items?.map((item : any, key: any) => (
                            <tr key={key} className="text-center">
                                <td className="border-r border-[#003553] px-4 py-2">
                                    {key + 1}
                                </td>
                                <td className="border-r border-[#003553] px-4 py-2">
                                    {item?.service?.code}
                                </td>
                                <td className="border-r border-[#003553] px-4 py-2">
                                    {item?.service?.name}
                                </td>
                                <td className="border-r border-[#003553] px-4 py-2">
                                    {item?.priceAtOrder}
                                </td>
                                <td className=" px-4 py-2">
                                    <Button
                                        type="default"
                                        className="rounded-[12px] border-none bg-[#E9ECEF]"
                                    >
                                        <LucideView size={18} />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}
