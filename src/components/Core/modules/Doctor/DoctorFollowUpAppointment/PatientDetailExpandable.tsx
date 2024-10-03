"use client"

import { AnimatePresence, motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import PatientDetailForm from './PatientDetail';

const PatientDetailExpandable = ({ isExpanded, setIsExpanded }: { isExpanded: boolean, setIsExpanded: (value: boolean) => void }) => {

    const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target instanceof HTMLElement && e.target.id === 'overlay') {
            setIsExpanded(false);
        }
    };

    const handleToggle = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        isExpanded && <div className="fixed h-screen w-screen z-[1000]">
            <div className='relative h-full w-full overflow-y-auto'>
                <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            id="overlay"
                            className="absolute min-h-screen flex justify-center items-center w-full bg-black bg-opacity-50 z-[99]"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            onClick={handleClose}
                        >
                            <motion.div
                                initial={{ y: 20 }}
                                animate={{ y: 0 }}
                                className='w-fit mt-[46px]'>
                                <PatientDetailForm />
                            </motion.div>

                        </motion.div >
                    )}
                </AnimatePresence>
                {/* <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            layout
                            className="absolute z-[10000] h-fit w-[775px] flex items-center justify-center"
                            initial={false}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        >
                            <motion.div
                                ref={contentRef}
                                className="bg-white rounded-[12px] shadow-third max-h-[90vh]"
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                style={{
                                    maxWidth: '90vw',
                                    width: contentHeight > window.innerHeight * 0.9 ? '100%' : 'auto'
                                }}
                            >
                                <PatientDetailForm />
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence> */}
            </div>
        </div>
    );
};

export default PatientDetailExpandable;