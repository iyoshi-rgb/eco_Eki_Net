import axios from 'axios';
import { Link } from 'react-router-dom';
import { useEffect,useState } from 'react';
import { useLocationContext } from '../../base/LocationContext';
//import { choice } from './co2';

import '../css/timeline.css'

// 口コミを取得する
function TimeLine() {
    const [reviews, setReviews] = useState([]);
    const { nearestLocationName } = useLocationContext();
    //const [selectedStation, setSelectedStation] = useState('');
    const [selectedButtonText,setSelectedButtonText] = useState('総合');


    useEffect(() => {
        let endpoint = '/reviews';
    if (selectedButtonText === '烏丸線') {
        endpoint += '?stationCategory=烏丸線';
    } else if(selectedButtonText === '東西線'){
        endpoint += '?stationCategory=東西線';
    } else if (selectedButtonText ===  nearestLocationName) {
        endpoint += `?stationName=${encodeURIComponent(nearestLocationName)}`;
    }

    axios.get(endpoint)
    .then((response) => {
        setReviews(response.data);
    })
    .catch((error) => {
        console.error('口コミの取得に失敗しました:', error);
    });
}, [selectedButtonText, nearestLocationName]);

    const handleButtonClick = (text) => {
        if(text === '最寄り駅'){
            setSelectedButtonText(nearestLocationName)
        }else{
            setSelectedButtonText(text);
        }
    };

    
    return (
        <div>
            <div className="button-container">
                {['総合', '烏丸線','東西線', '最寄り駅'].map((text) => (
                    <button
                        key={text}
                        className={`button ${selectedButtonText === text ? 'selected' : ''}`}
                        onClick={() => handleButtonClick(text)}
                    >
                        {text}
                    </button>
                ))}
            </div>
            
        {selectedButtonText &&(
            <div className='selected-button-text'>
                {selectedButtonText}
            </div>
        )}
        <div>
                {/*<select value={selectedStation} onChange={(e) => setSelectedStation(e.target.value)}>
                        <option value=''>選択してください</option>
                        {Object.entries(choice).map(([key, value]) => (
                            <option key={key} value={value}>{value}</option>
                        ))}
                        </select>*/}
            </div>
        {reviews.length > 0 ? (
        <ul>
        {reviews.map((review, index) => (
            <li key={index} className='review-card'>
            <h3>{review.stationName}駅</h3>
            <p>{review.content}</p>
            </li>
        ))}
        </ul>
    ) : (
        <p>口コミはありません</p>
    )}
        <Link to='/write'>
            <button className="add-review-button" type='button' aria-label="口コミを書く"></button>
        </Link>
    </div>
    );
    }

export default TimeLine;