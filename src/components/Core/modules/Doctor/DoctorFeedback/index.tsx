'use client'

import React, { useEffect } from 'react'
import { Star } from 'lucide-react'
import { useGetAllFeedbacksQuery } from '@/stores/services/doctor/doctorFeedback'
import { useRouter, useSearchParams } from 'next/navigation'
import dayjs from 'dayjs'
import { Avatar, Pagination, Skeleton } from 'antd'

interface IFeedback {
    id: string
    comment: string
    vote: number
    patientName: string
    avatarUrl: string
    createdAt: Date
}

const ReviewItem = ({ review }: { review: IFeedback }) => (
    <div className="shadow-md hover:shadow-lg mb-4 rounded-[12px] border-b border-gray-200 bg-white p-4 shadow-third transition-shadow duration-200 last:border-b-0">
        <div className="mb-3 flex items-center">
            <Avatar
                src={review.avatarUrl}
                alt={review.patientName}
                className="shadow-sm mr-4 h-14 w-14 rounded-full border-2 border-gray-300 object-cover"
            />
            <div>
                <div className="mb-1 flex items-center">
                    <h3 className="mr-2 text-lg font-semibold text-secondarySupperDarker">
                        {review.patientName}
                    </h3>
                    <div className="ml-4 mr-4 text-sm text-gray-500">
                        Đã đánh giá
                    </div>
                    <div className="ml-2 flex">
                        {[...Array(5)].map((_, index) => (
                            <Star
                                fill={`${index + 1 <= review.vote ? '#FDD836' : 'white'}`}
                                key={index}
                                className="h-5 w-5 text-[#FDD836]"
                            />
                        ))}
                    </div>
                </div>
                <p className="text-sm text-gray-500">
                    {dayjs(review.createdAt).format('DD/MM/YYYY HH:mm')}{' '}
                </p>
            </div>
        </div>

        <p
            className="text-base leading-relaxed text-secondarySupperDarker"
            dangerouslySetInnerHTML={{ __html: review.comment }}
        />
    </div>
)

export default function DoctorFeedback() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const pageSize = searchParams.get('pageSize') || '5'
    const currentPage = searchParams.get('page') || '1'
    const selectedVote = searchParams.get('vote') || ''

    const { feedbacks, rating, totalOfRating, isFetching } =
        useGetAllFeedbacksQuery(
            {
                pageSize: pageSize,
                pageIndex: currentPage,
                vote: selectedVote, // Include selectedVote here
            },
            {
                selectFromResult: ({ data, isFetching }) => ({
                    feedbacks:
                        (data?.body?.feedbacks?.contents as IFeedback[]) || [],
                    rating: data?.body?.rating || 0,
                    totalOfRating: data?.body?.totalOfRating || 0,
                    isFetching,
                }),
            },
        )

    // Use effect to handle route changes based on selected vote
    useEffect(() => {
        const query = new URLSearchParams({
            page: currentPage,
            pageSize: pageSize,
            vote: selectedVote,
        }).toString()

        router.push(`?${query}`)
    }, [selectedVote, currentPage, pageSize, router])

    const handleVoteChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const voteValue = e.target.value
        router.push(`?page=1&pageSize=${pageSize}&vote=${voteValue}`)
    }

    const handlePageChange = (page: number, pageSize?: number) => {
        router.push(
            `?page=${page}&pageSize=${pageSize || pageSize}&vote=${selectedVote}`,
        )
    }

    return (
        <>
            {!isFetching ? (
                <div className="mx-auto w-full rounded-[12px] bg-gray-50 p-4 shadow-third">
                    <h2 className="mb-3 text-base font-bold text-secondarySupperDarker">
                        Đánh giá
                    </h2>
                    <div className="flex gap-[20px] text-[14px] font-semibold text-secondarySupperDarker">
                        Số lượt đánh giá:{' '}
                        <span className="flex text-[#FDD836]">
                            {rating.toFixed(1)}{' '}
                            <Star
                                fill="#FDD836"
                                className={`pl- text-lg text-[#FDD836]`}
                            />
                        </span>{' '}
                        ({totalOfRating} lượt)
                        <span className="pl-3">
                            <select
                                value={selectedVote}
                                onChange={handleVoteChange}
                                className="ml-4 rounded-md border border-gray-300 p-1 text-sm"
                            >
                                <option value="">Tất cả đánh giá</option>
                                {[1, 2, 3, 4, 5].map((rating) => (
                                    <option key={rating} value={rating}>
                                        {rating} Sao
                                    </option>
                                ))}
                            </select>
                        </span>
                    </div>

                    <h3 className="mb-2 mt-6 text-[14px] font-semibold text-secondarySupperDarker">
                        Lịch sử đánh giá:
                    </h3>
                    <div className="rounded-[12px] p-4">
                        {feedbacks.map((review) => (
                            <ReviewItem key={review.id} review={review} />
                        ))}
                    </div>

                    <div className="mt-4 flex justify-center">
                        <Pagination
                            current={Number(currentPage)}
                            pageSize={Number(pageSize)}
                            total={totalOfRating}
                            onChange={handlePageChange}
                        />
                    </div>
                </div>
            ) : (
                <Skeleton active />
            )}
        </>
    )
}
