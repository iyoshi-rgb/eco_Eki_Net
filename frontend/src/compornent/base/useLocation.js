import { useState, useEffect } from 'react';

const useLocation = () => {
    const [location, setLocation] = useState({
        latitude: null,
        longitude: null,
        error: null,
    });

    useEffect(() => {
        let watchId;

        if (navigator.geolocation) {
            watchId = navigator.geolocation.watchPosition(
                (position) => {
                    setLocation({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        error: null,
                    });
                },
                (error) => {
                    setLocation((prevLocation) => ({
                        ...prevLocation,
                        error: error.message,
                    }));
                },
                // オプションは状況に応じて設定してください
                { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
            );
        } else {
            setLocation((prevLocation) => ({
                ...prevLocation,
                error: "Geolocation is not supported by this browser.",
            }));
        }

        // コンポーネントのアンマウント時にwatchをクリア
        return () => navigator.geolocation.clearWatch(watchId);
    }, []);

    return location;
};

export default useLocation;