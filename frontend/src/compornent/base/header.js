import React from 'react';
import { useAuth } from './AuthContext';
import { Link } from 'react-router-dom'; 
import '../base/asset/css/component.css';


function Header() {
    const { isLoggedIn, logout } = useAuth();


    const handleLogout = () => {
        logout();
    }

    return (
        <header className="header">
            <h3 className='title'>eco駅NET</h3>
            <div className="header-links">
                {isLoggedIn ? (
                    <ul>
                        <li className='menu-item'><Link to="/" onClick={handleLogout}>ログアウト</Link></li>
                        <li className='menu-item'><Link to="/mypage">マイページ</Link></li>
                    </ul>
                ) : (
                    <ul>
                        <li className='menu-item'><Link to="/signup">新規登録</Link></li>
                        <li className='menu-item'><Link to="/login">ログイン</Link></li>
                    </ul>
                )}
            </div>
        </header>
    );
}

export default Header;
