"use client"

import React from 'react'
import { Star } from 'lucide-react'

interface Review {
    id: string
    userName: string
    avatar: string
    date: string
    rating: number
    content: string
}

const reviews: Review[] = [
    {
        id: '1',
        userName: 'Nguyễn Thị Hằng',
        avatar: 'https://gravatar.com/avatar/e7f242ab6fb92ab2f4c3a372fc7bcd5c?s=400&d=retro&r=pg',
        date: '12:24 - 24/2/2024',
        rating: 5,
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    },
    {
        id: '2',
        userName: 'Nguyễn Thị Hằng',
        avatar: 'https://gravatar.com/avatar/e7f242ab6fb92ab2f4c3a372fc7bcd5c?s=400&d=retro&r=pg',
        date: '12:24 - 24/2/2024',
        rating: 5,
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    },
    {
        id: '3',
        userName: 'Nguyễn Thị Hằng',
        avatar: 'https://gravatar.com/avatar/e7f242ab6fb92ab2f4c3a372fc7bcd5c?s=400&d=retro&r=pg',
        date: '12:24 - 24/2/2024',
        rating: 4.2,
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    },
    {
        id: '4',
        userName: 'Nguyễn Thị Hằng',
        avatar: 'https://gravatar.com/avatar/e7f242ab6fb92ab2f4c3a372fc7bcd5c?s=400&d=retro&r=pg',
        date: '12:24 - 24/2/2024',
        rating: 5,
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    }
]

const ReviewItem = ({ review }: { review: Review }) => (
    <div className="p-[15px] rounded-[12px] mb-3 border-b bg-white border-gray-200 last:border-b-0">
        <div className="flex items-center mb-2">
            <img src={review.avatar} alt={review.userName} className="w-12 h-12 rounded-full mr-4" />
            <div>
                <div className="flex items-center">
                    <h3 className="text-base font-semibold text-secondarySupperDarker mr-2">{review.userName}</h3>
                    <div className="flex">
                        {[...Array(5)].map((_, index) => (
                            <Star fill={`${index + 1 <= review.rating ? '#FDD836' : 'white'}`} key={index} className={'text-[#FDD836]'} />
                        ))}
                    </div>
                </div>
                <p className="text-sm text-secondarySupperDarker">{review.date}</p>
            </div>
        </div>

        <p className="text-base text-secondarySupperDarker font-semibold text-[14px]">{review.content}</p>
    </div>
)

export default function DoctorFeedback() {
    return (
        <div className="bg-gray-50 w-full mx-auto p-4 rounded-[12px] shadow-third">
            <h2 className="text-base font-bold mb-3 text-secondarySupperDarker">Đánh giá</h2>
            <div className='text-[14px] font-semibold flex gap-[20px] text-secondarySupperDarker'>Số lượt đá đánh giá: <span className='flex text-[#FDD836]'>5.0 <Star fill='#FDD836' className={`text-lg text-[#FDD836]`} /></span> (20 lượt)</div>
            <h3 className="text-[14px] font-semibold mb-2 text-secondarySupperDarker mt-6">Lịch sử đánh giá:</h3>
            <div className="rounded-[12px] p-4">
                {reviews.map(review => (
                    <ReviewItem key={review.id} review={review} />
                ))}
            </div>
        </div>
    )
}