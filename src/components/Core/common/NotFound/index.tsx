'use client'
import React from 'react'
import {motion} from 'framer-motion'
import Image from 'next/image'

function NotFound() {
  return (
    <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.1 }}
    className='w-full h-full'
>
    <div className='flex items-center justify-center w-full h-full flex-col mt-10'>
        <h1 className='text-[52px] font-bold text-secondaryDarker'>OOPS!</h1>
        <p className='text-[22px] font-bold text-secondaryDarker'>Không tìm thấy nội dung!</p>
    </div>
</motion.div>
  )
}

export default NotFound