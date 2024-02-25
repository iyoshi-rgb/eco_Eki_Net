import React, { useEffect, useState } from "react";

import axios from "axios";

import { choice } from './co2';
import { useLocationContext } from '../../base/LocationContext';
import { useAuth } from '../../base/AuthContext'; 
import useLocation from "../../base/useLocation";
import { useNavigate } from "react-router-dom";

import '../css/write.css'

function Write() {

    const navigate = useNavigate();

    const { isLoggedIn } = useAuth();

    useEffect(() => {
        if(!isLoggedIn){
            navigate('/login');
        }
    },[isLoggedIn,navigate]);

    const [content, setContent] = useState("");
    const [selectedStation, setSelectedStation] = useState('');
    const { latitude,longitude } = useLocation();
    //const {nearestLocationName} = useLocationContext();

    // 選択された値を更新するハンドラー
    const handleStartChange = (event) => {
        setSelectedStation(event.target.value);
    };

    // フォーム送信ハンドラー
    const handleSubmit = async (event) => {
        event.preventDefault(); // デフォルトのフォーム送信を防止

        try {
            const response = await axios.post('/reviews', {
                firstChoice: selectedStation, // 選択された開始駅
                content: content, // 口コミ内容
                userLatitude: latitude,
                userLongitude: longitude,
            });
            console.log(response.data);
            if(response.data && response.data.message){
                alert(response.data.message);
            }else{
                alert('口コミが投稿されました!');
                navigate('/timeline')
            }
            // 成功した後の状態リセットや追加処理をここに書く
            setContent('');
            setSelectedStation('');
        } catch (error) {
            console.error('口コミの投稿に失敗しました:', error);
            if(error.response && error.response.data && error.response.data.message){
                alert(error.response.data.message);
            }else{
                alert('口コミの投稿に失敗しました');
            }
        }
    };

    return (
        <div className="write-container">
            {/*{nearestLocationName && <p>Nearest Location: {nearestLocationName}</p>}*/}
            <form className="write-form" onSubmit={handleSubmit}>
                <label>
                    <select value={selectedStation} onChange={handleStartChange}>
                        <option value=''>駅を選択してください</option>
                        {Object.entries(choice).map(([key, value]) => (
                            <option key={key} value={value}>{value}</option>
                        ))}
                    </select>
                </label>
                {selectedStation && <p>{selectedStation}</p>} {/* 選択された駅名を表示 */}
                <h2>口コミ投稿フォーム</h2>
                <textarea
                    className="write-textarea"
                    placeholder="口コミ内容を入力してください"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <button className="submit-button" type="submit">口コミを投稿</button>
            </form>
        </div>
    );
}

export default Write;
