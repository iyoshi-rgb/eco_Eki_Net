import './App.css';
//1．useStateとuseEffectをインポート
import { useState,useEffect } from 'react';

function App() {
  //useStateの初期値（空）を設定
  const [message, setMessage] = useState('');
  
  useEffect(() => {
    //fetchでバックエンドExpressのサーバーを指定
    fetch('/api')
      //レスポンスをjsonとして受け取りjsオブジェクトを生成
      .then((res) => res.json())
      //生成したjsオブジェクトをdataに代入
      //data.messageで取り出したデータをuseStateに保存
      .then((data) => setMessage(data.message));
  },[])

  return (
<div style={{width: '100%', height: '100%', position: 'relative', background: 'white'}}>
    <div style={{width: 430, height: 86, left: 0, top: 846, position: 'absolute', background: '#5EE030'}}>
        <div style={{width: 86, height: 0, left: 169, top: 0, position: 'absolute', transform: 'rotate(90deg)', transformOrigin: '0 0', border: '3px white solid'}}></div>
        <div style={{width: 86, height: 0, left: 255, top: 0, position: 'absolute', transform: 'rotate(90deg)', transformOrigin: '0 0', border: '3px white solid'}}></div>
        <div style={{width: 86, height: 0, left: 342, top: 0, position: 'absolute', transform: 'rotate(90deg)', transformOrigin: '0 0', border: '3px white solid'}}></div>
        <img style={{width: 63, height: 63, left: 10, top: 18, position: 'absolute'}} src="https://via.placeholder.com/63x63" />
        <img style={{width: 63, height: 63, left: 269, top: 20, position: 'absolute'}} src="https://via.placeholder.com/63x63" />
        <img style={{width: 60, height: 60, left: 183, top: 19, position: 'absolute'}} src="https://via.placeholder.com/60x60" />
        <img style={{width: 60, height: 60, left: 99, top: 21, position: 'absolute'}} src="https://via.placeholder.com/60x60" />
        <img style={{width: 60, height: 60, left: 359, top: 21, position: 'absolute'}} src="https://via.placeholder.com/60x60" />
        <div style={{width: 54, height: 15, left: 19, top: 4, position: 'absolute', color: 'white', fontSize: 15, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word'}}>ホーム</div>
        <div style={{width: 54, height: 15, left: 105, top: 3, position: 'absolute', color: 'white', fontSize: 15, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word'}}>駅情報<br/></div>
        <div style={{width: 65, height: 15, left: 185, top: 2, position: 'absolute', color: 'white', fontSize: 15, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word'}}>ポイント</div>
        <div style={{width: 78, height: 15, left: 350, top: 3, position: 'absolute', color: 'white', fontSize: 15, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word'}}>CO2排出量</div>
        <div style={{width: 49, height: 15, left: 280, top: 3, position: 'absolute', color: 'white', fontSize: 15, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word'}}>口コミ</div>
    </div>
    <div style={{width: 86, height: 0, left: 83, top: 846, position: 'absolute', transform: 'rotate(90deg)', transformOrigin: '0 0', border: '3px white solid'}}></div>
    <div style={{width: 430, height: 79, paddingTop: 19, paddingBottom: 20, left: 0, top: 0, position: 'absolute', background: '#5EE030', justifyContent: 'center', alignItems: 'center', display: 'inline-flex'}}>
        <div style={{width: 107, height: 40, color: 'white', fontSize: 35, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word'}}>ホーム</div>
    </div>
    <div style={{width: 351, height: 90, paddingLeft: 55, paddingRight: 55, paddingTop: 26, paddingBottom: 26, left: 40, top: 135, position: 'absolute', background: '#5EE030', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', borderRadius: 10, overflow: 'hidden', border: '2px #69955A solid', justifyContent: 'center', alignItems: 'center', display: 'inline-flex'}}>
        <div style={{width: 241, height: 38, color: 'white', fontSize: 40, fontFamily: 'jsMath-cmbx10', fontWeight: '700', wordWrap: 'break-word'}}>駅を検索する</div>
    </div>
    <div style={{width: 351, height: 90, paddingLeft: 55, paddingRight: 55, paddingTop: 28, paddingBottom: 28, left: 40, top: 242, position: 'absolute', background: '#5EE030', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', borderRadius: 10, overflow: 'hidden', border: '2px #69955A solid', justifyContent: 'center', alignItems: 'center', display: 'inline-flex'}}>
        <div style={{width: 241, height: 34, color: 'white', fontSize: 40, fontFamily: 'jsMath-cmbx10', fontWeight: '700', wordWrap: 'break-word'}}>駅ランキング</div>
    </div>
    <div style={{width: 166, height: 90, paddingLeft: 5, paddingRight: 5, left: 40, top: 566, position: 'absolute', background: '#FFED48', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', borderRadius: 10, overflow: 'hidden', border: '2px #D3C227 solid', justifyContent: 'center', alignItems: 'center', display: 'inline-flex'}}>
        <div style={{width: 156, height: 24, color: 'white', fontSize: 26, fontFamily: 'jsMath-cmbx10', fontWeight: '700', wordWrap: 'break-word'}}>口コミを書く</div>
    </div>
    <div style={{width: 166, height: 90, paddingLeft: 6, paddingRight: 5, left: 225, top: 566, position: 'absolute', background: '#FFED48', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', borderRadius: 10, overflow: 'hidden', border: '2px #D3C227 solid', justifyContent: 'center', alignItems: 'center', display: 'inline-flex'}}>
        <div style={{width: 155, height: 21, color: 'white', fontSize: 26, fontFamily: 'jsMath-cmbx10', fontWeight: '700', wordWrap: 'break-word'}}>タイムライン</div>
    </div>
    <div style={{width: 351, height: 90, paddingLeft: 67, paddingRight: 67, paddingTop: 28, paddingBottom: 28, left: 40, top: 727, position: 'absolute', background: '#40DAFC', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', borderRadius: 10, overflow: 'hidden', border: '2px #17ABCC solid', justifyContent: 'center', alignItems: 'center', display: 'inline-flex'}}>
        <div style={{width: 217, height: 34, color: 'white', fontSize: 40, fontFamily: 'jsMath-cmbx10', fontWeight: '700', wordWrap: 'break-word'}}>CO2排出量</div>
    </div>
    <div style={{width: 166, height: 121, paddingLeft: 28, paddingRight: 28, paddingTop: 37, paddingBottom: 37, left: 40, top: 384, position: 'absolute', background: '#FEA623', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', borderRadius: 10, overflow: 'hidden', border: '2px #D2840F solid', justifyContent: 'center', alignItems: 'center', display: 'inline-flex'}}>
        <div style={{width: 110, height: 47, color: 'white', fontSize: 27, fontFamily: 'jsMath-cmbx10', fontWeight: '700', wordWrap: 'break-word'}}>ポイントをためる</div>
    </div>
    <div style={{width: 166, height: 121, paddingLeft: 28, paddingRight: 28, paddingTop: 37, paddingBottom: 37, left: 225, top: 384, position: 'absolute', background: '#FEA623', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', borderRadius: 10, overflow: 'hidden', border: '2px #D2840F solid', justifyContent: 'center', alignItems: 'center', display: 'inline-flex'}}>
        <div style={{width: 110, height: 47, color: 'white', fontSize: 27, fontFamily: 'jsMath-cmbx10', fontWeight: '700', wordWrap: 'break-word'}}>ポイントを使う</div>
    </div>
    <div style={{width: 148, height: 29, left: 25, top: 100, position: 'absolute'}}><span style="color: '#69955A', fontSize: 20, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word'">● </span><span style="color: 'black', fontSize: 20, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word'">駅情報</span></div>
    <div style={{width: 148, height: 29, left: 25, top: 349, position: 'absolute'}}><span style="color: '#69955A', fontSize: 20, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word'">● </span><span style="color: 'black', fontSize: 20, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word'">ポイント</span></div>
    <div style={{width: 148, height: 29, left: 25, top: 521, position: 'absolute'}}><span style="color: '#69955A', fontSize: 20, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word'">● </span><span style="color: 'black', fontSize: 20, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word'">口コミ</span></div>
    <div style={{width: 148, height: 29, left: 25, top: 686, position: 'absolute'}}><span style="color: '#69955A', fontSize: 20, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word'">● </span><span style="color: 'black', fontSize: 20, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word'">CO2排出量</span></div>
</div>
  );
}

export default App;