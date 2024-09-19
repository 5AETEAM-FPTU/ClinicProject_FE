"use client"
import { RingLoader } from 'react-spinners';
import { motion } from 'framer-motion';

export default function RingLoaderComponent() {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
            <motion.div initial={{ opacity: 0 }} transition={{ duration: 0.2, delay: 0 }} animate={{ opacity: 0.2 }} className='fixed inset-0 bg-black'></motion.div>
            <motion.div initial={{ opacity: 0 }} transition={{ duration: 0.2, delay: 0 }} animate={{ opacity: 1 }}>
                <RingLoader
                    size={80}
                    color={"#0284C7"}
                    loading={true}
                    speedMultiplier={1}
                    cssOverride={{
                        display: 'block',
                        position: "fixed",
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        zIndex: 9999,
                        margin: '0 auto',
                        borderColor: 'red'
                    }}
                />
            </motion.div>
        </div>
    )

}