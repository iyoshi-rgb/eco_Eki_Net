import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSignUp = async () => {
    try {
        await axios.post('http://localhost:3001/signup', { username, password });
        console.log('User registered successfully');
    } catch (error) {
        console.error('Error registering user', error.response.data.message);
    }
    };

    const handleLogin = async () => {
    try {
        await axios.post('http://localhost:3001/login', { username, password });
        console.log('Login successful');
    } catch (error) {
        console.error('Error logging in', error.response.data.message);
    }
    };

    const handleLogout = async () => {
    try {
        await axios.get('http://localhost:3001/logout');
        console.log('Logout successful');
    } catch (error) {
        console.error('Error logging out', error.response.data.message);
    }
    };

    return (
    <div>
        <h1>User Authentication</h1>
        <div>
            <h2>Sign Up</h2>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleSignUp}>Sign Up</button>
        </div>
        <div>
            <h2>Login</h2>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Login</button>
        </div>
        <div>
            <h2>Logout</h2>
            <button onClick={handleLogout}>Logout</button>
        </div>
    </div>
    );
};

export default App;
