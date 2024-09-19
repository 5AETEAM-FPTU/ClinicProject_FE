"use client"
import { ClimbingBoxLoader } from 'react-spinners';
export default function ClimbingBoxLoaderComponent() {
    return (
        <ClimbingBoxLoader
            size={20}
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
        />)
}