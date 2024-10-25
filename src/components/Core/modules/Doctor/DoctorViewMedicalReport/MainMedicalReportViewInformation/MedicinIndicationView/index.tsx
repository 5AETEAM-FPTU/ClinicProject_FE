import { useGetMedicineOrderByIdQuery } from "@/stores/services/report/medicineOrder";


export default function MedicineIndicationView({
    payload,
} : any) {
    const medicineId = payload?.medicineOrderId

    const { medicine, refetch, isFetching } = useGetMedicineOrderByIdQuery(
        medicineId!,
        {
            selectFromResult: ({ data, isFetching }) => ({
                medicine: data?.body?.medicineOrder ?? {},
                isFetching: isFetching,
            }),
        },
    )
    return (
        <>
            <div className="mt-5 overflow-y-auto max-w-[900px] bg-[#FFFFFF] rounded-xl shadow-[0px_4px_12px_rgba(0,53,83,0.5)] p-4">
                <table className="min-w-full bg-[#FFFFFF] text-[#003553]">
                    <thead>
                        <tr className="bg-[#FFFFFF] text-center">
                            <th className="px-4 py-2 border-b border-r border-[#003553]">STT</th>
                            <th className="px-4 py-2 border-b border-r border-[#003553]">Tên thuốc</th>
                            <th className="px-4 py-2 border-b border-r border-[#003553]">Cách sử dụng</th>
                            <th className="px-4 py-2 border-b border-r border-[#003553]">Số lượng</th>
                            <th className="px-4 py-2 border-b border-[#003553]">Dạng</th>
                        </tr>
                    </thead>
                    <tbody>
                        {medicine?.items?.map((item:any, key:any) => (
                            <tr key={key} className="text-center">
                                <td className="px-4 py-2 border-r border-[#003553]">{key + 1}</td>
                                <td className="px-4 py-2 border-r border-[#003553]">{item?.medicine?.name}</td>
                                <td className="px-4 py-2 border-r border-[#003553]">{item?.description}</td>
                                <td className="px-4 py-2 border-r border-[#003553]">{item?.quantity}</td>
                                <td className="px-4 py-2">{item?.medicine?.type?.name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="mt-4 text-[#003553] text-left">
                    <strong>Dặn dò:</strong> {medicine?.note}
                </div>
            </div>
        </>
    );
}


