import React from 'react';
import '../css/home.css'

import { Link,useNavigate } from 'react-router-dom';

function Home(){

    let navigate = useNavigate();

    return(
    <div>
    <p><span>●</span>駅情報</p>
    <Link to='/search'>
    <button  className="Green" type='button'>駅を検索する</button>
    </Link>
    <br></br>
    <Link to='/ranking'>
    <button className='Green' type='button'>駅ランキング</button>
    </Link>
    <br></br>

    <p><span>●</span>ポイント</p>
    <div className='container'>
    <button className='Yellow' type='button' onClick={() => navigate('/stock')}>ためる</button>
    <button className='Yellow' type='button' onClick={() => navigate('/use')}>使う</button>
    <br></br>
    </div>

    <p><span>●</span>口コミ</p>
    <div className='container'>
    <button className='Orange' type='button' onClick={() => navigate('/write')}>口コミを書く</button>
    <button className='Orange' type='button' onClick={() => navigate('/timeline')}>タイムライン</button>
    <br></br>
    </div>


    <p><span>●</span>CO2排出量</p>
    <Link to='/co2'>
    <button className='Blue' type='button'>CO2排出量</button>
    </Link>
    </div>
    );
}

export default Home;