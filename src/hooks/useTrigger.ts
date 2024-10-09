'use client'
import { useState } from "react";

export const useTrigger = () => {
    const [trigger, setTrigger] = useState(false);
    const handleTrigger = () => {
        setTrigger(!trigger);
    }
    const handleTriggerPayload = (payload:boolean) => {
        setTrigger(payload);
    }
    return {
        trigger,
        handleTrigger,
        handleTriggerPayload
    }
}