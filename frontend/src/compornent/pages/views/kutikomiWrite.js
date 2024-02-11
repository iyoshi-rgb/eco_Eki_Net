import React, { useState} from "react";
import axios from "axios";

function Write() {
    // 口コミ内容を保持するための状態
    const [content, setContent] = useState("");

    const submitReview = () => {
        axios.post('/reviews', {
            content: content,
        })
        .then((response) => {
            alert('口コミが投稿されました！');
            // ここで必要に応じて状態や他の処理を更新する
        })
        .catch((error) => {
            console.error('口コミの投稿に失敗しました:', error);
        });
    };

    return (
        <div>
            <h2>口コミ投稿フォーム</h2>

            <textarea
                rows="4"
                cols="50"
                placeholder="口コミ内容を入力してください"
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
            <br />
            <button onClick={submitReview}>口コミを投稿</button>
        </div>
    );
}

export default Write;
