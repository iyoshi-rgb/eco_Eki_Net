import './App.css';

import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';


import Header from './compornent/base/header';
import Footer from './compornent/base/footer';

import Home from './compornent/pages/views/home'
import TimeLine from './compornent/pages/views/timeline';
import Ranking from './compornent/pages/views/ranking';
import Stock from './compornent/pages/views/pointStock';
import Use from './compornent/pages/views/pointUse';
import Write from './compornent/pages/views/kutikomiWrite';
import Co2 from './compornent/pages/views/co2';
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
    <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/ranking' element={<Ranking />}/>
          <Route path='/stock' element={<Stock />}/>
          <Route path='/use' element={<Use />}/>
          <Route path='/write' element={<Write />}/>
          <Route path='/timeline' element={<TimeLine />}/>
          <Route path='/co2' element={<Co2 />}/>
        </Routes>
      </Router>
    <Footer />
  </div>
  );
}

export default App;