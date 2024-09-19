'use client'
import { Layout } from 'antd'
import React from 'react'
import { motion } from 'framer-motion'

function UnAccessable() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.1 }}
        >
            <Layout className='flex items-center justify-center !h-screen'>
                <h1 className='text-[62px] font-bold text-secondaryDarker'>OOPS!</h1>
                <p className='text-[32px] font-bold text-secondaryDarker'>Không được phép truy cập!</p>
            </Layout>
        </motion.div>
    )
}

export default UnAccessable
