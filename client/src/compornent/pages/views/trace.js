import React, { useEffect, useState } from 'react';
import { useAuth } from '../../base/AuthContext';
import { useNavigate } from 'react-router-dom';

const Trace = () => {
    const [startLocation, setStartLocation] = useState({ latitude: 0, longitude: 0 }); 
    const [goalLocation, setGoalLocation] = useState({ latitude: 0, longitude: 0 }); 
    const [currentLocation, setCurrentLocation] = useState({ latitude: 0, longitude: 0 });
    const [isAtStart, setIsAtStart] = useState(false);
    const [isAtEnd, setIsAtEnd] = useState(false);

    const navigate = useNavigate();
    const { isLoggedIn } = useAuth();

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login');
            return;
        }
        // This async function is defined inside the useEffect to fetch data
        const fetchData = async () => {
            try {
                const response = await fetch('/trace');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setStartLocation(data.startLocation);
                setGoalLocation(data.goalLocation);
            } catch (error) {
                console.error('Failed to fetch:', error);
            }
        };

        fetchData();

        const watchId = navigator.geolocation.watchPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setCurrentLocation({ latitude, longitude });

                setIsAtStart(checkProximity(startLocation, { latitude, longitude }));
                setIsAtEnd(checkProximity(goalLocation, { latitude, longitude }));
            },
            (error) => {
                console.error(error);
            },
            {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0,
            }
        );

        // Cleanup function to clear watchPosition on component unmount
        return () => navigator.geolocation.clearWatch(watchId);
    }, [isLoggedIn, navigate]); // Dependencies for useEffect

    useEffect(() => {
        if (isAtStart && isAtEnd) {
            const sendCompletion = async () => {
                try {
                    const response = await fetch('/complete', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            startLocation,
                            goalLocation,
                            currentLocation,
                        }),
                    });
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    console.log('Completion reported successfully');
                } catch (error) {
                    console.error('Failed to report completion:', error);
                }
            };

            sendCompletion();
        }
    }, [isAtStart, isAtEnd, startLocation, goalLocation, currentLocation]); // Dependencies for useEffect

    const checkProximity = (location1, location2, threshold = 0.001) => {
        const latDiff = Math.abs(location1.latitude - location2.latitude);
        const lonDiff = Math.abs(location1.longitude - location2.longitude);
        return latDiff < threshold && lonDiff < threshold;
    };

    return (
        <div>
            {/*<h2>Location Checker</h2>*/}
            <p>Current Location: {currentLocation.latitude}, {currentLocation.longitude}</p>:
            <p>{startLocation.name}を: {isAtStart ? '通過しました' : '通過していません'}</p>
            <p>{goalLocation.name}を: {isAtEnd ? '通過しました' : '通過していません'}</p>
        </div>
    );
};

export default Trace;

