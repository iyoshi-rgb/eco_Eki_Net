import React, { useEffect, useState } from 'react';
import '../css/mypage.css'

import Image0_25 from '../images/0_25.png';
import Image25_50 from '../images/25_50.png';
import Image50_100 from '../images/50_100.png';
import Image100 from '../images/100.png';

import { Link } from 'react-router-dom';

function Mypage() {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
    // Function to fetch user data
        const fetchUserData = async () => {
        try {
            const response = await fetch('/mypage', {
            method: 'GET',
            headers: {
            // Optionally, include headers if needed, like authentication tokens
            'Content-Type': 'application/json',
            // 'Authorization': 'Bearer YOUR_TOKEN_HERE',
            },
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setUserData(data);
        } catch (error) {
        console.error('There was an error fetching the user data:', error);
        }
    };

    fetchUserData();
  }, []); // Empty dependency array means this effect runs once on mount

    const getImagePath = (point) =>{
        if(point <= 25){
            return Image0_25;
        }else if(point <= 50){
            return Image25_50;
        }else if(point <= 100){
            return Image50_100;
        }else{
            return Image100;
        }
    }
    return(
    <div>
        {userData ? (
        <>
            <div className="card">
                <p className="co2-reduction">CO2削減量</p>
                <p className="points">{userData.co2} g</p>
            </div>
            <div className="card-green">
            <div className="card-content">
                <p>Point: {userData.point}</p>
                <p className="point-difference">100まで残り:<br></br> {100 - userData.point}</p>
            </div>
        <img src={getImagePath(userData.point)} alt='' className="card-image" />
    </div>
    </>
    ) : (
    <p>Loading user data...</p>
    )}
    </div>
    );
}


export default Mypage;
