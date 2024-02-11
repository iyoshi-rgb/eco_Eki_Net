import axios from 'axios';
import { Link } from 'react-router-dom';
import { useEffect,useState } from 'react';

// 口コミを取得する
function TimeLine() {
    const [reviews, setReviews] = useState([]);
    
    useEffect(() => {
        axios.get('/reviews')
        .then((response) => {
            // 取得した口コミを状態にセットする
            setReviews(response.data);
        })
        .catch((error) => {
            console.error('口コミの取得に失敗しました:', error);
        });
    }, []);

      // 口コミを投稿する
    
    return (
        <div>
        <h1>口コミ一覧</h1>
        {reviews.length > 0 ? (
        <ul>
        {reviews.map((review, index) => (
            <li key={index}>
            <p>{review.content}</p>
            </li>
        ))}
        </ul>
    ) : (
        <p>口コミはありません</p>
    )}
        <Link to='/write'>
            <button  type='button'>口コミを書く</button>
        </Link>
    </div>
    );
    }

export default TimeLine;