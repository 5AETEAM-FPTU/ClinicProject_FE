'use client'
import { useState } from "react";

export const useTrigger = () => {
    const [trigger, setTrigger] = useState(false);
    const handleTrigger = () => {
        setTrigger(!trigger);
    }
    return {
        trigger,
        handleTrigger
    }
}