import { Calendar, MapPin, User, BriefcaseBusiness, House, CircleDollarSign } from 'lucide-react'

export default function Information({ fullName, specialties, price }: { fullName?: string | null, specialties?: string | null, price?: number }) {
    return (
        <div className="w-full h-fit bg-white rounded-lg shadow-third p-4">
            <h2 className="h-12 text-white text-[20px] rounded-lg font-bold text-center mb-4 bg-gradient-to-r from-[#54ADDA] from-0% to-secondaryDark to-100% rounded-t-lg p-2">Thông tin bác sĩ</h2>
            <div className="space-y-2">
                <div className="flex items-start text-base text-secondarySupperDarker"><div className='mr-2 mt-1'><CircleDollarSign className="w-5 h-5 text-[#B1B1B1]" aria-hidden="true" /></div>Giá: <span className='ml-1 font-bold'>{price?.toLocaleString('vi-VN')}đ</span></div>
                <div className="flex items-start text-base text-secondarySupperDarker"><div className='mr-2 mt-1'><BriefcaseBusiness className="w-5 h-5 text-[#B1B1B1]" aria-hidden="true" /></div> Chuyên khoa: {specialties ? specialties : 'Đang cật nhật'}</div>
                <div className="flex items-start text-base text-secondarySupperDarker"><div className='mr-2 mt-1'><User className="w-5 h-5 text-[#B1B1B1]" aria-hidden="true" /></div> Bác sĩ: <span className='uppercase ml-1'>{fullName}</span></div>
                {/* <p className="flex items-center"><MapPin className="w-5 h-5 mr-2" aria-hidden="true" /> Dịch vụ: Nội tổng quát</p> */}
            </div>
        </div>
    )
}