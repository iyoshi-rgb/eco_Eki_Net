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
    <div style="width: 100%; height: 100%; position: relative; background: white">
    <div style="width: 430px; height: 86px; left: 0px; top: 846px; position: absolute; background: #5EE030">
        <div style="width: 86px; height: 0px; left: 169px; top: 0px; position: absolute; transform: rotate(90deg); transform-origin: 0 0; border: 3px white solid"></div>
        <div style="width: 86px; height: 0px; left: 255px; top: 0px; position: absolute; transform: rotate(90deg); transform-origin: 0 0; border: 3px white solid"></div>
        <div style="width: 86px; height: 0px; left: 342px; top: 0px; position: absolute; transform: rotate(90deg); transform-origin: 0 0; border: 3px white solid"></div>
        <img style="width: 63px; height: 63px; left: 10px; top: 18px; position: absolute" src="https://via.placeholder.com/63x63" />
        <img style="width: 63px; height: 63px; left: 269px; top: 20px; position: absolute" src="https://via.placeholder.com/63x63" />
        <img style="width: 60px; height: 60px; left: 183px; top: 19px; position: absolute" src="https://via.placeholder.com/60x60" />
        <img style="width: 60px; height: 60px; left: 99px; top: 21px; position: absolute" src="https://via.placeholder.com/60x60" />
        <img style="width: 60px; height: 60px; left: 359px; top: 21px; position: absolute" src="https://via.placeholder.com/60x60" />
        <div style="width: 54px; height: 15px; left: 19px; top: 4px; position: absolute; color: white; font-size: 15px; font-family: Inter; font-weight: 400; word-wrap: break-word">ホーム</div>
        <div style="width: 54px; height: 15px; left: 105px; top: 3px; position: absolute; color: white; font-size: 15px; font-family: Inter; font-weight: 400; word-wrap: break-word">駅情報<br/></div>
        <div style="width: 65px; height: 15px; left: 185px; top: 2px; position: absolute; color: white; font-size: 15px; font-family: Inter; font-weight: 400; word-wrap: break-word">ポイント</div>
        <div style="width: 78px; height: 15px; left: 350px; top: 3px; position: absolute; color: white; font-size: 15px; font-family: Inter; font-weight: 400; word-wrap: break-word">CO2排出量</div>
        <div style="width: 49px; height: 15px; left: 280px; top: 3px; position: absolute; color: white; font-size: 15px; font-family: Inter; font-weight: 400; word-wrap: break-word">口コミ</div>
    </div>
    <div style="width: 86px; height: 0px; left: 83px; top: 846px; position: absolute; transform: rotate(90deg); transform-origin: 0 0; border: 3px white solid"></div>
    <div style="width: 430px; height: 79px; padding-top: 19px; padding-bottom: 20px; left: 0px; top: 0px; position: absolute; background: #5EE030; justify-content: center; align-items: center; display: inline-flex">
        <div style="width: 107px; height: 40px; color: white; font-size: 35px; font-family: Inter; font-weight: 400; word-wrap: break-word">ホーム</div>
    </div>
    <div style="width: 351px; height: 90px; padding-left: 55px; padding-right: 55px; padding-top: 26px; padding-bottom: 26px; left: 40px; top: 135px; position: absolute; background: #5EE030; box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25); border-radius: 10px; overflow: hidden; border: 2px #69955A solid; justify-content: center; align-items: center; display: inline-flex">
        <div style="width: 241px; height: 38px; color: white; font-size: 40px; font-family: jsMath-cmbx10; font-weight: 700; word-wrap: break-word">駅を検索する</div>
    </div>
    <div style="width: 351px; height: 90px; padding-left: 55px; padding-right: 55px; padding-top: 28px; padding-bottom: 28px; left: 40px; top: 242px; position: absolute; background: #5EE030; box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25); border-radius: 10px; overflow: hidden; border: 2px #69955A solid; justify-content: center; align-items: center; display: inline-flex">
        <div style="width: 241px; height: 34px; color: white; font-size: 40px; font-family: jsMath-cmbx10; font-weight: 700; word-wrap: break-word">駅ランキング</div>
    </div>
    <div style="width: 166px; height: 90px; padding-left: 5px; padding-right: 5px; left: 40px; top: 566px; position: absolute; background: #FFED48; box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25); border-radius: 10px; overflow: hidden; border: 2px #D3C227 solid; justify-content: center; align-items: center; display: inline-flex">
        <div style="width: 156px; height: 24px; color: white; font-size: 26px; font-family: jsMath-cmbx10; font-weight: 700; word-wrap: break-word">口コミを書く</div>
    </div>
    <div style="width: 166px; height: 90px; padding-left: 6px; padding-right: 5px; left: 225px; top: 566px; position: absolute; background: #FFED48; box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25); border-radius: 10px; overflow: hidden; border: 2px #D3C227 solid; justify-content: center; align-items: center; display: inline-flex">
        <div style="width: 155px; height: 21px; color: white; font-size: 26px; font-family: jsMath-cmbx10; font-weight: 700; word-wrap: break-word">タイムライン</div>
    </div>
    <div style="width: 351px; height: 90px; padding-left: 67px; padding-right: 67px; padding-top: 28px; padding-bottom: 28px; left: 40px; top: 727px; position: absolute; background: #40DAFC; box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25); border-radius: 10px; overflow: hidden; border: 2px #17ABCC solid; justify-content: center; align-items: center; display: inline-flex">
        <div style="width: 217px; height: 34px; color: white; font-size: 40px; font-family: jsMath-cmbx10; font-weight: 700; word-wrap: break-word">CO2排出量</div>
    </div>
    <div style="width: 166px; height: 121px; padding-left: 28px; padding-right: 28px; padding-top: 37px; padding-bottom: 37px; left: 40px; top: 384px; position: absolute; background: #FEA623; box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25); border-radius: 10px; overflow: hidden; border: 2px #D2840F solid; justify-content: center; align-items: center; display: inline-flex">
        <div style="width: 110px; height: 47px; color: white; font-size: 27px; font-family: jsMath-cmbx10; font-weight: 700; word-wrap: break-word">ポイントをためる</div>
    </div>
    <div style="width: 166px; height: 121px; padding-left: 28px; padding-right: 28px; padding-top: 37px; padding-bottom: 37px; left: 225px; top: 384px; position: absolute; background: #FEA623; box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25); border-radius: 10px; overflow: hidden; border: 2px #D2840F solid; justify-content: center; align-items: center; display: inline-flex">
        <div style="width: 110px; height: 47px; color: white; font-size: 27px; font-family: jsMath-cmbx10; font-weight: 700; word-wrap: break-word">ポイントを使う</div>
    </div>
    <div style="width: 148px; height: 29px; left: 25px; top: 100px; position: absolute"><span style="color: #69955A; font-size: 20px; font-family: Inter; font-weight: 400; word-wrap: break-word">● </span><span style="color: black; font-size: 20px; font-family: Inter; font-weight: 400; word-wrap: break-word">駅情報</span></div>
    <div style="width: 148px; height: 29px; left: 25px; top: 349px; position: absolute"><span style="color: #69955A; font-size: 20px; font-family: Inter; font-weight: 400; word-wrap: break-word">● </span><span style="color: black; font-size: 20px; font-family: Inter; font-weight: 400; word-wrap: break-word">ポイント</span></div>
    <div style="width: 148px; height: 29px; left: 25px; top: 521px; position: absolute"><span style="color: #69955A; font-size: 20px; font-family: Inter; font-weight: 400; word-wrap: break-word">● </span><span style="color: black; font-size: 20px; font-family: Inter; font-weight: 400; word-wrap: break-word">口コミ</span></div>
    <div style="width: 148px; height: 29px; left: 25px; top: 686px; position: absolute"><span style="color: #69955A; font-size: 20px; font-family: Inter; font-weight: 400; word-wrap: break-word">● </span><span style="color: black; font-size: 20px; font-family: Inter; font-weight: 400; word-wrap: break-word">CO2排出量</span></div>
</div>
  );
}

export default App;