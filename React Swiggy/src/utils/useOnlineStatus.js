// Input of the hook 
// Output of the hook
import { useState, useEffect } from 'react';

import React from 'react'

const useOnlineStatus = () => {
    const [onlineStatus, setOnlineStatus] = useState(true);
    // Check if the user is online or offline
    // Returns true if online, false if offline
    // I need To check once when the component mounts
    useEffect(() => {
        const goOffline = () => setOnlineStatus(false);
        const goOnline = () => setOnlineStatus(true);
        window.addEventListener("offline", goOffline);
        window.addEventListener("online", goOnline);
        return () => {
            window.removeEventListener("offline", goOffline);
            window.removeEventListener("online", goOnline);
        };
    }, []);

    return onlineStatus;
}

export default useOnlineStatus