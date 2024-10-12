import { IndividualMenuItemType } from '@/components/Core/ui/Menu'
import { CalendarDays, CircleUserRound, Headset, Home, Bot } from 'lucide-react'
import React from 'react'

export const sidebarPatientData: IndividualMenuItemType[] = [
    {
        key: 'overview',
        title: 'Tổng quan',
        icon: React.createElement(Home),
    },
    {
        key: 'treatment-calendar',
        title: 'Lịch khám',
        icon: React.createElement(CalendarDays),
        childrens: [
            {
                key: 'booking',
                lable: 'Đặt lịch',
            },
            {
                key: 'treatment-history',
                lable: 'Lịch sử khám',
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
            },
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
        ],
    },
    {
        key: 'ai-assistant',
        title: 'Trợ ý AI',
        icon: React.createElement(Bot),
        childrens: [
            {
                key: 'chat',
                lable: 'Nhắn tin với AI',
            },
        ],
    },
]
