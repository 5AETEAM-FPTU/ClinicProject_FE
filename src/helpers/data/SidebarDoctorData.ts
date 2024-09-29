import { IndividualMenuItemType } from '@/components/Core/ui/Menu'
import {
    CalendarDays,
    CalendarHeart,
    CircleUserRound,
    Headset,
    Home,
} from 'lucide-react'
import React from 'react'

export const sidebarDoctorData: IndividualMenuItemType[] = [
    {
        key: 'overview',
        title: 'Tổng quan',
        icon: React.createElement(Home),
    },
    {
        key: 'treatment-turn',
        title: 'Lượt khám',
        icon: React.createElement(CalendarHeart),
        childrens: [
            {
                key: 'treatment-onday',
                lable: 'Trong ngày',
            },
            {
                key: 'treatment-history',
                lable: 'Kết quả khám',
            },
            {
                key: 'treatment-cancel',
                lable: 'Bị hủy bỏ',
            },
        ],
    },
    {
        key: 'treatment-calendar',
        title: 'Lịch khám',
        icon: React.createElement(CalendarDays),
        childrens: [
            {
                key: 'recently',
                lable: 'Trong tuần',
            },
            {
                key: 'update-calendar',
                lable: 'Cập nhật lịch',
            },
            {
                key: 'booked-calendar',
                lable: 'Lịch đã đặt',
            },
            {
                key: 'retreatment',
                lable: 'Tái khám',
            },
        ],
    },
    {
        key: 'consultation',
        title: 'Tư vấn',
        icon: React.createElement(Headset),
        childrens: [
            {
                key: 'pending-room',
                lable: 'Phòng chờ',
            },
            {
                key: 'conversation',
                lable: 'Trò chuyện',
            }
        ],
    },
    {
        key: 'account',
        title: 'Tài khoản',
        icon: React.createElement(CircleUserRound),
        childrens: [
            {
                key: 'profile',
                lable: 'Trang cá nhân',
            },
            {
                key: 'settings',
                lable: 'Thiết lập',
            },
            {
                key: 'feedbacks',
                lable: 'Feedbacks',
            }
        ]
    },
]
