import React, { useState,useEffect } from 'react';
import axios from 'axios';

function LocationComponent() {
    const [station, setStation] = useState('');

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;

        try {
            const response = await axios.post('/find-nearest-station', { latitude, longitude });
            if (response.data.results && response.data.results.length > 0) {
            setStation(response.data.results[0].name);
        } else {
            setStation('最寄りの駅が見つかりませんでした。');
        }
        } catch (error) {
            console.error('Error fetching nearest station:', error);
            setStation('駅を取得できませんでした。');
        }
    }, (error) => {
        console.error('Geolocation Error:', error);
        });
    }, []);

    return (
        <div>
            <h1>最寄りの駅</h1>
            <p>{station}</p>
        </div>
    );
}

export default LocationComponent;
