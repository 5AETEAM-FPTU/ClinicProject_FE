"use client"
import React from 'react'
import { AnimatePresence, motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import PatientDetailForm from './PatientDetail';
import { Button, Modal } from 'antd';

export const PatientModal = ({ patientId, open, setOpen }: { patientId: string | null, open: boolean, setOpen: (open: boolean) => void }) => {
    return (
        <>
            <Modal
                title={null}
                footer={null}
                open={open}
                onCancel={() => setOpen(false)}
                className='w-full lg:w-[90%] shadow-third'
            >
                <PatientDetailForm patientId={patientId} />
            </Modal>
        </>
    );
};


export default PatientModal;