// LocationContext.js
import React, { createContext, useState, useContext } from 'react';

const LocationContext = createContext();

export const useLocationContext = () => useContext(LocationContext);

export const LocationProvider = ({ children }) => {
    const [nearestLocationName, setNearestLocationName] = useState('');

    return (
        <LocationContext.Provider value={{ nearestLocationName, setNearestLocationName }}>
            {children}
        </LocationContext.Provider>
    );
};
