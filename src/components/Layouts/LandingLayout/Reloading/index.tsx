'use client'
import React, { useEffect, useState } from 'react'
import './style.css'

function Reloading() {
    return (
        <div
            className={`animation-turn-off fixed top-0 z-[1000] h-full w-full`}
        >
            <div className="animate-opacity flex h-full items-center justify-center bg-secondary">
                <div className="content animate-scale flex w-full items-center justify-center">
                    <h2 className="relative text-[32px] font-extrabold text-transparent text-secondarySupperDarker md:text-[64px] lg:text-[64px] xl:text-[64px]">
                        P-CLINIC
                    </h2>
                    <h2 className="absolute text-[32px] font-extrabold text-secondaryDark md:text-[64px] lg:text-[64px] xl:text-[64px]">
                        P-CLINIC
                    </h2>
                </div>
            </div>
        </div>
    )
}

export default Reloading
