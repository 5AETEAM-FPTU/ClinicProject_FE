import { Calendar, MapPin, User, BriefcaseBusiness, House } from 'lucide-react'

export default function Information({ selectedDate }: { selectedDate: Date | null }) {
    return (
        <div className="w-full h-fit md:w-1/3 bg-white rounded-lg shadow p-4">
            <h2 className="text-white text-xl font-bold text-center uppercase mb-4 bg-gradient-to-r from-[#665ee3] from-0% to-[#358ec8] to-90% rounded-t-lg p-2">Thông tin cơ sở y tế</h2>
            <div className="space-y-2">
                <p className="flex items-center"><House className="w-5 h-5 mr-2" aria-hidden="true" /> Phòng Khám Đa Khoa Pháp Anh</p>
                <p className="flex items-center"> 222-224-226 Nguyễn Duy Dương, Phường 4, Quận 10, TP.HCM</p>
                <p className="flex items-center"><BriefcaseBusiness className="w-5 h-5 mr-2" aria-hidden="true" /> Chuyên khoa: Nội tổng quát</p>
                <p className="flex items-center"><User className="w-5 h-5 mr-2" aria-hidden="true" /> Bác sĩ: Lê Ngọc Ánh</p>
                <p className="flex items-center"><MapPin className="w-5 h-5 mr-2" aria-hidden="true" /> Dịch vụ: Nội tổng quát</p>
                <p className="flex items-center"><Calendar className="w-5 h-5 mr-2" aria-hidden="true" /> Ngày khám: {selectedDate?.toLocaleDateString('vi-VN')}</p>
            </div>
        </div>
    )
}