import React, { useEffect, useState } from 'react';
import axios from 'axios';

function StaffDashboard() {
    const [reviews, setReviews] = useState([]);
    const stationName = "指定したい駅名"; // この値を適切に設定

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get(`/stationReviews?stationName=${encodeURIComponent(stationName)}`);
                setReviews(response.data);
            } catch (error) {
                console.error('口コミデータの取得に失敗しました。', error);
            }
        };

        fetchReviews();
    }, [stationName]);

    // 感謝するボタンのクリックイベントハンドラ
    const handleThankButtonClick = async (reviewId) => {
        try {
            // POSTリクエストをサーバーに送信
            await axios.post('/review/thank', { reviewId });
            // 成功したら、口コミの表示を更新するためにfetchReviewsを再度呼び出すか、
            // またはレスポンスに基づいてローカルのstateを更新する
            alert('感謝の気持ちを送りました！');
        } catch (error) {
            console.error('感謝の送信に失敗しました。', error);
        }
    };

    return (
        <div>
            <h2>口コミ一覧</h2>
            <ul>
                {reviews.map((review) => (
                    review.contribution === 0 ? (
                        <li key={review.id}>
                            {review.content}
                            {/* 感謝するボタン */}
                            <button onClick={() => handleThankButtonClick(review.id)}>感謝する</button>
                        </li>
                    ) : null // contribution が 1 なら何も表示しない
                ))}
            </ul>
        </div>
    );
}

export default StaffDashboard;

