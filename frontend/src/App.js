import './App.css';
import Header from './compornent/base/header';
import Footer from './compornent/base/footer';

//1．useStateとuseEffectをインポート
//import { useState,useEffect } from 'react';

function App() {
  //useStateの初期値（空）を設定
  //const [message, setMessage] = useState('');
  
  //useEffect(() => {
    //fetchでバックエンドExpressのサーバーを指定
    //fetch('/api')
      //レスポンスをjsonとして受け取りjsオブジェクトを生成
      //.then((res) => res.json())
      //生成したjsオブジェクトをdataに代入
      //data.messageで取り出したデータをuseStateに保存
      //.then((data) => setMessage(data.message));
  //},[])
  

  return (
    <div className='home'>
    <Header />
    <p><span>●</span>駅情報</p>
    <button  className="Green" type='button'>駅を検索する</button>
    <br></br>
    <button className='Green' type='button'>駅ランキング</button>
    <br></br>

    <p><span>●</span>ポイント</p>
    <div className='container'>
    <button className='Yellow' type='button'>ためる</button>
    <button className='Yellow' type='button'>使う</button>
    <br></br>
    </div>

    <p><span>●</span>口コミ</p>
    <div className='container'>
    <button className='Orange' type='button'>口コミを書く</button>
    <button className='Orange' type='button'>タイムライン</button>
    <br></br>
    </div>


    <p><span>●</span>CO2排出量</p>
    <button className='Blue' type='button'>CO2排出量</button>
    <Footer />
  </div>
  );
}

export default App;