'use client'
import React from 'react'

import Header from './Header'
import Footer from './Footer'
import dynamic from 'next/dynamic'

const DynamicHeader = dynamic(() => import('./Header'), { ssr: false })

function LandingLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <Header />
            {children}
            <Footer />
        </div>
    )
}

export default LandingLayout
