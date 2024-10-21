"use client"
import React from 'react'
import { AnimatePresence, motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import PatientDetailForm from './PatientDetail';
import { Button, Modal } from 'antd';
import { set } from 'lodash';


export const PatientModal = ({ patientId, open, setOpen }: { patientId: string, open: boolean, setOpen: (open: boolean) => void }) => {
    const [loading, setLoading] = React.useState<boolean>(true);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        })
    }, [patientId]);

    return (
        <>
            <Modal
                title={null}
                footer={null}
                loading={loading}
                open={open}
                onCancel={() => setOpen(false)}
                className='w-full lg:w-fit shadow-third'
            >
                <PatientDetailForm />
            </Modal>
        </>
    );
};


export default PatientModal;