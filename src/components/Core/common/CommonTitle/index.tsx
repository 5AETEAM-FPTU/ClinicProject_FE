'use clients'
import React from 'react'
import { cn } from '@/lib/utils'

type TProps = {
    title?: string | null
    subtile?: string | null
}

function CommonTitle({ title, subtile }: TProps) {
    return (
        <div className={cn('flex w-full flex-col items-center justify-center')}>
            <h1 className={cn('text-[28px] text-center sm:text-[46px] font-bold text-secondaryDarker')}>
                {title ? title.toUpperCase() : ''}
            </h1>
            <p className={cn('font-[500] text-center')}>{subtile}</p>
        </div>
    )
}

export default CommonTitle
