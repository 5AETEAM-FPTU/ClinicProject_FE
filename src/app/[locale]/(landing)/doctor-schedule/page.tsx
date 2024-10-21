import Calendar from '@/components/Core/modules/Calendar/Calendar'
export default function CalendarPage() {
    return (
        <div className="mt-[180px] w-full flex justify-center flex-col items-center">
            <div className='max-w-[1440px] w-[1440px] pb-5 px-[80px]'>
                <h1 className='text-[20px] font-semibold text-secondarySupperDarker'>Tiến hành chọn ngày khám của bác sĩ</h1>
            </div>
            <div className="max-w-[1440px] w-[1440px] pb-10 px-[80px]">
                <Calendar />
            </div>
        </div>
    )
}
