import React, { useState,useEffect } from 'react';

function LocationComponent() {
    const [location, setLocation] = useState('');

    const getLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        setLocation('Geolocation is not supported by this browser.');
    }
    };

    const showPosition = (position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    setLocation(`Latitude: ${lat}, Longitude: ${lon}`);

    // 位置情報をサーバーに送信
    fetch('/location', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ latitude: lat, longitude: lon }),
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch((error) => console.error('Error:', error));
    };

    const showError = (error) => {
    switch(error.code) {
        case error.PERMISSION_DENIED:
        setLocation('User denied the request for Geolocation.');
        break;
        case error.POSITION_UNAVAILABLE:
        setLocation('Location information is unavailable.');
        break;
        case error.TIMEOUT:
        setLocation('The request to get user location timed out.');
        break;
        case error.UNKNOWN_ERROR:
        setLocation('An unknown error occurred.');
        break;
        default:
        setLocation('An unexpected error occurred.'); // defaultケースを追加
        break;
    }
    };

    const [message, setMessage] = useState('');
        useEffect(() => {
    //fetchでバックエンドExpressのサーバーを指定
        fetch('/location')
      //レスポンスをjsonとして受け取りjsオブジェクトを生成
        .then((res) => res.json())
      //生成したjsオブジェクトをdataに代入
      //data.messageで取り出したデータをuseStateに保存
        .then((data) => setMessage(data.message));
        },
    [])


    return (
    <div>
        <button onClick={getLocation}>現在地を取得</button>
        <p>{message}</p>
    </div>
);
}

export default LocationComponent;
