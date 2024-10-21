'use client'
import { Button } from 'antd'
import React from 'react'

export default function UserDeleteAccount() {
    return (
        <div className="h-fit w-full rounded-xl bg-white p-5 shadow-third">
            <div
                className='w-full flex flex-col  sm:flex-row gap-5 items-start sm:items-center'
            >
                <Button type="primary" danger>Xóa tài khoản</Button>
                <div>
                    <p className='font-semibold'>Bạn sẽ không thể sử dụng tài khoản sau khi xóa tài khoản</p>
                    <p className='text-[12px] font-semibold'>Liên hệ với chúng tôi để khôi phục tài khoản trong vòng 30 ngày</p>
                </div>
            </div>
        </div>
    )
}
