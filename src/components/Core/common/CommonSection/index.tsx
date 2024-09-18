'use client'
import React from 'react'
import CommonTitle from '../CommonTitle'
import { cn } from '@/lib/utils'

import { motion } from 'framer-motion'

type TProps = {
    title?: string | null
    subtile?: string | null
    tailCustomStyle?: string
    children?: React.ReactNode
}

function CommonSection({ title, subtile, tailCustomStyle, children }: TProps) {
    return (
        <div
            className={cn(
                'flex h-fit w-full justify-center py-[60px]',
                tailCustomStyle,
            )}
        >
            <motion.div
                initial={{
                    y: 10,
                    opacity: 0,
                }}
                whileInView={{
                    y: 0,
                    opacity: 1,
                }}
                transition={{
                    type: 'spring',
                    duration: 1,
                    delay: 0.45,
                }}
                viewport={{
                    once: true,
                }}
                className={cn('h-fit w-[1440px] max-w-[1440px] px-[80px]')}
            >
                <CommonTitle title={title} subtile={subtile} />
                <div className="mt-[40px]">{children}</div>
            </motion.div>
        </div>
    )
}

export default CommonSection
