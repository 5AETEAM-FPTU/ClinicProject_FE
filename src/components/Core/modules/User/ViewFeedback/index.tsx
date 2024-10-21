import { Star } from "lucide-react"
import Image from "next/image"

export default function ViewFeedback() {
    return (
        <div
            className="h-fit w-[65%]"
        >
            <div className="">
                <div className="h-[140px] bg-[#E9ECEF] rounded-xl flex items-center gap-3 px-5">
                    <Image height={200} width={200} src={"https://i.pinimg.com/564x/92/26/5c/92265c40c8e428122e0b32adc1994594.jpg"} alt="" className="rounded-xl h-[100px] w-[100px]" />
                    <div className="flex flex-col text-[14px] font-bold justify-center select-none">
                        <p className="text-[14px]">Đến: <span>Thạc sĩ - bác sĩ Đoàn Văn Mạnh</span></p>
                        <p className="py-2">Chuyên khoa: <span className="font-normal">Chuyên nội tim mạch</span></p>
                        <p className="flex">Được đánh giá: <span className="pl-2">5 <Star size={16} fill={'currentColor'}
                            strokeWidth={1.5} className="text-yellow-500 inline-block mb-[3px]" /></span></p>
                    </div>
                </div>
                <div className="flex gap-10 items-center py-6 text-[#003553] font-bold pl-1"><p>Đánh giá của bạn</p>
                    <div
                        className="flex space-x-2"
                    >
                        {[1, 2, 3, 4, 5].map((starIndex) => (
                            <button
                                key={starIndex}
                            >
                                <Star
                                    size={30}
                                    className={"transition-all duration-300 ease-in-out text-yellow-400"
                                    }
                                    fill={
                                        'currentColor'
                                    }
                                    strokeWidth={1.5}
                                />
                            </button>
                        ))}
                    </div>
                </div>
                <div

                    className="flex w-full flex-col gap-4"

                >
                    <div className="w-full flex-col gap-5">
                        <div>
                            <div
                                className="!mb-0"
                            >
                                <p>Umbala</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}