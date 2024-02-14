// StaffLogin.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function StaffLogin() {
    const navigate = useNavigate();

    const [stationName, setStationname] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const res = await axios.post('/staff-login', {
        stationName,
        password,
    });
      // Handle staff login success (if needed)
        alert('Staff login successful');
        navigate('/staff-dashboard'); // Redirect to staff dashboard or other page
    } catch (error) {
        console.error(error);
        alert('Staff login failed');
    }
};

    return (
    <div>
        <h2>Staff Login</h2>
        <form onSubmit={handleSubmit}>
        <div>
            <label>stationName:</label>
            <input type="text" value={stationName} onChange={(e) => setStationname(e.target.value)} />
        </div>
        <div>
            <label>Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Login</button>
    </form>
    </div>
);
}

export default StaffLogin;
