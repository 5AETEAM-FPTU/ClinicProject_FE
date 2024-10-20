'use client'
import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import Footer from './Footer'
import Reloading from './Reloading'
import Header from './Header'
import HeaderMobile from './HeaderMobile'

function LandingLayout({ children }: { children: React.ReactNode }) {
    const [isLoading, setIsLoading] = useState(true);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const loadingTimeout = setTimeout(() => {
            setIsLoading(false);
        }, 1800);

        return () => {
            clearTimeout(loadingTimeout);
        };
    }, []);
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.matchMedia('(max-width: 768px)').matches);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    return (
        <div>
            {isLoading ? <Reloading /> : null}
            {isMobile ? <HeaderMobile /> : <Header />}
            {children}
            <Footer />
        </div>
    );
}

export default LandingLayout;
