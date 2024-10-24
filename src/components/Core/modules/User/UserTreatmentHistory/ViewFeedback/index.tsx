import { useGetFeedbackQuery } from '@/stores/services/user/userAppointments'
import { Modal, Skeleton } from 'antd'
import { Star } from 'lucide-react'
import Image from 'next/image'

interface IProps {
    open: boolean
    close: () => void
    appointmentId: string
}

interface DoctorSpecialty {
    id: string
    name: string
    constant: string
}

interface FeedbackDetail {
    id: string
    comment: string
    vote: number
}

interface DoctorDetail {
    fullname: string
    avatarUrl: string
    rating: number
    specialties: DoctorSpecialty[]
}

export default function ViewFeedback({ open, close, appointmentId }: IProps) {
    const { feedback, doctor, refetch, isFetching } = useGetFeedbackQuery(
        {
            appointmentId: appointmentId,
        },
        {
            skip: !appointmentId,
            selectFromResult: ({ data, isFetching }) => ({
                feedback: (data?.body?.feedback as FeedbackDetail) ?? {},
                doctor: (data?.body?.doctor as DoctorDetail) ?? {},
                isFetching: isFetching,
            }),
        },
    )

    return (
        <Modal
            open={open}
            onCancel={close}
            closeIcon={false}
            className="h-fit w-[65%]"
        >
            {!isFetching ? (
                <div className="">
                    <div className="flex h-[140px] items-center gap-3 rounded-xl bg-[#E9ECEF] px-5">
                        <Image
                            height={200}
                            width={200}
                            src={doctor.avatarUrl}
                            alt=""
                            className="h-[100px] w-[100px] rounded-xl object-cover"
                        />
                        <div className="flex select-none flex-col justify-center text-[14px] font-bold">
                            <p className="text-[14px]">
                                Đến: <span>{doctor?.fullname}</span>
                            </p>
                            <p className="py-2">
                                Chuyên khoa:{' '}
                                {doctor?.specialties
                                    ?.map((specialty, index) => specialty?.name)
                                    .join(', ')}
                            </p>
                            <p className="flex">
                                Được đánh giá:{' '}
                                <span className="pl-2">
                                    {doctor?.rating}{' '}
                                    <Star
                                        size={16}
                                        fill={'currentColor'}
                                        strokeWidth={1.5}
                                        className="mb-[3px] inline-block text-yellow-500"
                                    />
                                </span>
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-10 py-6 pl-1 font-bold text-[#003553]">
                        <p>Đánh giá của bạn</p>
                        <div className="flex space-x-2">
                            {Array.from(
                                { length: feedback?.vote },
                                (_, index) => index + 1,
                            ).map((starIndex) => (
                                <button key={starIndex}>
                                    <Star
                                        size={30}
                                        className={
                                            'text-yellow-400 transition-all duration-300 ease-in-out'
                                        }
                                        fill={'currentColor'}
                                        strokeWidth={1.5}
                                    />
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="flex w-full flex-col gap-4">
                        <div className="w-full flex-col gap-5">
                            <div>
                                <div className="!mb-0 pl-1 font-semibold text-[#003553]">
                                    Nội dung đánh giá:{' '}
                                    <p
                                        className="font-normal"
                                        dangerouslySetInnerHTML={{
                                            __html: feedback?.comment,
                                        }}
                                    ></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <Skeleton active />
            )}
        </Modal>
    )
}
