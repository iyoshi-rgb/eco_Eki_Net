import '../base/asset/css/component.css';

import SplashImage from '../base/asset/images/エコ駅ネットアイコン.png'

function SplashScreen() {
    return (
        <div className="splash-screen">
            <img src={SplashImage} alt="" style={{ width: '20%', height: '20%', marginBottom: '20px' }} />
        </div>
    );
}

export default SplashScreen;