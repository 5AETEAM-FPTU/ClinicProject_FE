'use client'
import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { Grid } from 'antd'
import Footer from './Footer'
import Reloading from './Reloading'

const DynamicHeader = dynamic(() => import('./Header'), { ssr: false })
const DynamicHeaderMobile = dynamic(() => import('./HeaderMobile'), { ssr: false })

function LandingLayout({ children }: { children: React.ReactNode }) {
    const screen = Grid.useBreakpoint();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadingTimeout = setTimeout(() => {
            setIsLoading(false);
        }, 2000);

        return () => {
            clearTimeout(loadingTimeout);
        };
    }, []);
    return (
        <div>
            {isLoading ? <Reloading /> : null}
            {screen.md ? <DynamicHeader /> : <DynamicHeaderMobile />}
            {children}
            <Footer />
        </div>
    );
}

export default LandingLayout;
