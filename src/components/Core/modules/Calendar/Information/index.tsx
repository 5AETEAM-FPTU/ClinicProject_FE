import { Calendar, MapPin, User, BriefcaseBusiness, House, CircleDollarSign } from 'lucide-react'

export default function Information({ selectedDate }: { selectedDate: Date | null }) {
    return (
        <div className="w-full h-fit bg-white rounded-lg shadow p-4">
            <h2 className="h-12 text-white text-[20px] font-bold text-center mb-4 bg-gradient-to-r from-[#54ADDA] from-0% to-[#0284C7] to-100% rounded-t-lg p-2">Thông tin bác sĩ</h2>
            <div className="space-y-2">
                <p className="flex items-center text-base text-secondarySupperDarker"><CircleDollarSign className="w-5 h-5 mr-2 text-[#B1B1B1]" aria-hidden="true" />Giá: <span className='ml-1 font-bold'>150.000đ</span></p>
                <p className="flex items-center text-base text-secondarySupperDarker"><BriefcaseBusiness className="w-5 h-5 mr-2 text-[#B1B1B1]" aria-hidden="true" /> Chuyên khoa: Nội tổng quát</p>
                <p className="flex items-center text-base text-secondarySupperDarker"><User className="w-5 h-5 mr-2 text-[#B1B1B1]" aria-hidden="true" /> Bác sĩ: <span className='uppercase ml-1'>Lê Ngọc Ánh</span></p>
                {/* <p className="flex items-center"><MapPin className="w-5 h-5 mr-2" aria-hidden="true" /> Dịch vụ: Nội tổng quát</p> */}
            </div>
        </div>
    )
}