import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../base/AuthContext';

function Login() {

    const navigate = useNavigate();
    const { login } = useAuth();


    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/login', {
                username,
                password
            });
            login(res.data);
            alert('ログインしました');
            navigate('/');
        } catch (error) {
            console.error(error);
            alert('ログインできませんでした');
        }
    };

    return (
        <div>
            <h3>ログインすると<br></br>
            口コミ投稿など、<br></br>
            ポイント還元機能を使用できます。</h3>
            <h2>ログイン</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                </div>
                <button type="submit">Login</button>
            </form>
            <a href='/signup'>新規登録</a><br></br>
            <a href="/staff-login">駅職員の方はこちら</a><br></br>   
            <a href='/'>Home</a>
        </div>
    );
}


export default Login;
