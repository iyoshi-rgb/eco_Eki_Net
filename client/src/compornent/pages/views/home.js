import React, { useEffect, useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { useLocationContext } from '../../base/LocationContext';
import '../css/home.css'
import SplashScreen from '../../base/Splashscreen';
import LocationPermissionScreen from '../../base/LocationPermissionScreen';

function Location  ()  {
    const [location, setLocation] = useState({
        latitude: null,
        longitude: null,
        error: null,
    });
    const { nearestLocationName,setNearestLocationName}= useLocationContext();
    const [isLoading, setIsLoading] = useState(true);//Loading状態

    const[loading,setLoading] = useState(true);
    const [showLocationPermission, setShowLocationPermission] = useState(true);
    const [showSplashScreen, setShowSplashScreen] = useState(true);


    let navigate = useNavigate();




    useEffect(() => {
        const hasUsedApp = sessionStorage.getItem('hasUsedApp');

        if(hasUsedApp){
            setShowSplashScreen(false);
        }


        const locationPermission = sessionStorage.getItem('locationPermission');
        if(locationPermission === 'granted'){
            setShowLocationPermission(false);
        };




        const timer = setTimeout(() => {
            setLoading(false);
            if(!hasUsedApp){
                sessionStorage.setItem('hasUsedApp','true');
            }
        }, 3000);

        return () =>{ 
            clearTimeout(timer);
        
    };
    }, []);


    useEffect(() => {
        let watchId;

        setIsLoading(true);

        const updateLocation = (position) => {
            setLocation({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                error: null,
            });
            setIsLoading(false);
        };

        const handleError = (error) => {
            setLocation({
                latitude: null,
                longitude: null,
                error: error.message,
            });
            setIsLoading(false);
        };

        if (navigator.geolocation) {
            watchId = navigator.geolocation.watchPosition(updateLocation, handleError, {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0,
            });
        } else {
            setLocation({ error: "Geolocation is not supported by this browser." });
            setIsLoading(false);
        }

        return () => {
            if (watchId) {
                navigator.geolocation.clearWatch(watchId);
            }
        };
    }, []);


    useEffect(() => {
        // 緯度経度が取得できている、かつエラーがない場合のみ実行
        if (location.latitude && location.longitude && !location.error) {
            sendLocationToServer();
        }
    }, [location]); // locationが変わるたびに実行


    const sendLocationToServer = async () => {
        try {
            const response = await fetch('/location', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    latitude: location.latitude,
                    longitude: location.longitude,
                }),
            });
            const data = await response.json();
            console.log(data);
            // 更新: サーバーから受け取った最も近い場所の名前を状態にセット
            if (data.nearestLocation) {
                setNearestLocationName(data.nearestLocation);
            }
        } catch (error) {
            console.error('Error sending location to server:', error);
        }
    };

    if(loading && showSplashScreen){
        return<SplashScreen />
    }

    if (showLocationPermission) {
        return( <LocationPermissionScreen onPermissionGranted={() => { setShowLocationPermission(false); 
    }}
    onPermissionDenied = {() => {
        alert('位置情報の使用が許可されませんでした。このアプリを使用するには、位置情報の使用を許可してください。');
    }}

    />
    );
}

    return (
        <div>
            {isLoading ?(
                <h3>現在地を取得中...</h3>
            ) : location.error ? (
                <p>Error: {location.error}</p>
            ) : (
                <>
                    {/*<p>Latitude: {location.latitude}, Longitude: {location.longitude}</p>*/}
                    {/* 最も近い場所の名前を表示 */}
                    
                    {nearestLocationName &&(
                        <div className='nowLocation-text'>
                    最寄り駅は{nearestLocationName}駅です。
                    </div>
                    )}
                    
    {/*                <p><span>●</span>駅情報</p>
    
    <br></br>
    <Link to='/ranking'>
    <button className='Green' type='button'>最寄り駅</button>
    </Link>
    <br></br>
    */}

    <p><span>●</span>口コミ</p>
    <div className='container'>
    <button className='Orange' type='button' onClick={() => navigate('/write')}>口コミを書く</button>
    <button className='Orange' type='button' onClick={() => navigate('/timeline')}>タイムライン</button>
    <br></br>
    </div>


    <p><span>●</span>CO2排出量</p>
    <Link to='/co2'>
    <button className='Blue' type='button'>CO2排出量</button>
    </Link>
                </>
            )}
            {/*<button onClick={sendLocationToServer}>現在地送信</button>

            <Link to='/write'>
            <button  type='button'>口コミを書く</button>
            </Link>*/}
        </div>
    );
};
export const location = Location;
export default Location;