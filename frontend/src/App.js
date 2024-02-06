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
<<<<<<< HEAD
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
=======
<div style={{width: '100%', height: '100%', position: 'relative', background: 'white', border: '1px white solid'}}>
    <div style={{width: 1280, height: 154, left: 0, top: 0, position: 'absolute', background: '#5EE030'}} />
    <div style={{width: 289, height: 107, left: 496, top: 24, position: 'absolute', color: 'white', fontSize: 96, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word'}}>ホーム</div>
    <div style={{width: 356, height: 76, left: 73, top: 169, position: 'absolute'}}><span style="color: '#69955A', fontSize: 50, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word'">● </span><span style="color: 'black', fontSize: 50, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word'">駅情報</span></div>
    <div style={{width: 356, height: 76, left: 648, top: 169, position: 'absolute'}}><span style="color: '#69955A', fontSize: 50, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word'">● </span><span style="color: 'black', fontSize: 50, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word'">口コミ</span></div>
    <div style={{width: 356, height: 76, left: 648, top: 527, position: 'absolute'}}><span style="color: '#69955A', fontSize: 50, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word'">● </span><span style="color: 'black', fontSize: 50, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word'">CO2排出量</span></div>
    <div style={{width: 356, height: 76, left: 73, top: 527, position: 'absolute'}}><span style="color: '#69955A', fontSize: 50, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word'">● </span><span style="color: 'black', fontSize: 50, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word'">ポイント</span></div>
    <div style={{width: 400, height: 110, paddingTop: 36, paddingBottom: 36, paddingLeft: 80, paddingRight: 79, left: 96, top: 265, position: 'absolute', background: '#5EE030', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', borderRadius: 10, overflow: 'hidden', border: '2px #69955A solid', justifyContent: 'center', alignItems: 'center', display: 'inline-flex'}}>
        <div style={{width: 241, height: 38, color: 'white', fontSize: 40, fontFamily: 'jsMath-cmbx10', fontWeight: '700', wordWrap: 'break-word'}}>駅を検索する</div>
    </div>
    <div style={{width: 400, height: 110, paddingTop: 38, paddingBottom: 38, paddingLeft: 80, paddingRight: 79, left: 96, top: 400, position: 'absolute', background: '#5EE030', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', borderRadius: 10, overflow: 'hidden', border: '2px #69955A solid', justifyContent: 'center', alignItems: 'center', display: 'inline-flex'}}>
        <div style={{width: 241, height: 34, color: 'white', fontSize: 40, fontFamily: 'jsMath-cmbx10', fontWeight: '700', wordWrap: 'break-word'}}>駅ランキング</div>
    </div>
    <div style={{width: 190, height: 140, paddingTop: 48, paddingBottom: 45, paddingLeft: 40, paddingRight: 40, left: 81, top: 620, position: 'absolute', background: '#FEA623', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', borderRadius: 10, overflow: 'hidden', border: '2px #D2840F solid', justifyContent: 'center', alignItems: 'center', display: 'inline-flex'}}>
        <div style={{width: 110, height: 47, color: 'white', fontSize: 27, fontFamily: 'jsMath-cmbx10', fontWeight: '700', wordWrap: 'break-word'}}>ポイントをためる</div>
    </div>
    <div style={{width: 190, height: 140, paddingTop: 48, paddingBottom: 45, paddingLeft: 40, paddingRight: 40, left: 306, top: 620, position: 'absolute', background: '#FEA623', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', borderRadius: 10, overflow: 'hidden', border: '2px #D2840F solid', justifyContent: 'center', alignItems: 'center', display: 'inline-flex'}}>
        <div style={{width: 110, height: 47, color: 'white', fontSize: 27, fontFamily: 'jsMath-cmbx10', fontWeight: '700', wordWrap: 'break-word'}}>ポイントを使う</div>
    </div>
    <div style={{height: 160, paddingTop: 40, paddingBottom: 96, paddingLeft: 61, paddingRight: 33, left: 683, top: 268, position: 'absolute', background: '#FFED48', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', borderRadius: 10, overflow: 'hidden', border: '2px #D3C227 solid', justifyContent: 'flex-end', alignItems: 'center', display: 'inline-flex'}}>
        <div style={{width: 156, height: 24, color: 'white', fontSize: 40, fontFamily: 'jsMath-cmbx10', fontWeight: '700', wordWrap: 'break-word'}}>口コミを書く</div>
    </div>
    <div style={{width: 250, height: 160, paddingTop: 59, paddingBottom: 80, paddingLeft: 14, paddingRight: 14, left: 974, top: 260, position: 'absolute', background: '#FFED48', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', borderRadius: 10, overflow: 'hidden', border: '2px #D3C227 solid', justifyContent: 'center', alignItems: 'center', display: 'inline-flex'}}>
        <div style={{width: 222, height: 21, color: 'white', fontSize: 36, fontFamily: 'jsMath-cmbx10', fontWeight: '700', wordWrap: 'break-word'}}>タイムライン</div>
    </div>
    <div style={{width: 527, height: 130, paddingLeft: 130, paddingRight: 130, left: 683, top: 626, position: 'absolute', background: '#40DAFC', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', borderRadius: 10, overflow: 'hidden', border: '2px #17ABCC solid', justifyContent: 'center', alignItems: 'center', display: 'inline-flex'}}>
        <div style={{width: 267, height: 34, color: 'white', fontSize: 48, fontFamily: 'jsMath-cmbx10', fontWeight: '700', wordWrap: 'break-word'}}>CO2排出量</div>
    </div>
</div>
>>>>>>> 02cc9c0c5bbfac652b6257f2fd8478685705a6e5
  );
}

export default App;