import { IndividualMenuItemType } from '@/components/Core/ui/Menu'
import {
    BriefcaseMedical,
    CalendarHeart,
    CircleUserRound,
    Headset,
    Home,
    StickyNote,
    UserSearch,
} from 'lucide-react'
import React from 'react'

export const sidebarStaffData: IndividualMenuItemType[] = [
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
        key: 'doctors',
        title: 'Bác sĩ',
        icon: React.createElement(BriefcaseMedical),
        childrens: [
            {
                key: 'all-doctors',
                lable: 'Tất cả',
            },
            {
                key: 'set-calendar',
                lable: 'Lên lịch',
            },
            {
                key: 'treatment-calendar',
                lable: 'Các lịch khám',
            },
            {
                key: 'retreatment',
                lable: 'Tái khám',
            },
        ],
    },
    {
        key: 'patients',
        title: 'Bệnh nhân',
        icon: React.createElement(UserSearch),
        childrens: [
            {
                key: 'all-patients',
                lable: 'Tất cả',
            },
            {
                key: 'manual-created',
                lable: 'Tạo thủ công',
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
        key: 'blog',
        title: 'Blog',
        icon: React.createElement(StickyNote),
        childrens: [
            {
                key: 'post',
                lable: 'Bài viết',
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
]
