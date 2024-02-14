import React, { useState } from 'react';
import '../base/asset/css/locationPermission.css'

function LocationPermissionScreen({ onPermissionGranted, onPermissionDenied }) {
  const [showWarning, setShowWarning] = useState(false); // 警告メッセージの表示状態

const handlePermission = (permissionGranted) => {
    if (permissionGranted) {
      // 許可された場合の処理
      sessionStorage.setItem('locationPermission','granted');
      onPermissionGranted();
    } else {
      // 拒否された場合、警告メッセージを表示
        setShowWarning(true);
        onPermissionDenied();
    }
};

    return (
    <div>
        {showWarning && <h3>位置情報の使用が許可されませんでした。
            <br></br>このアプリの機能をフルに活用するには、位置情報の使用を許可してください。</h3>}
        
        <h3>このアプリはあなたの位置情報を使用します。
            <br></br>位置情報の使用を許可しますか？</h3>
        <div className='container'>
        <button className='button' onClick={() => handlePermission(true)}>許可する</button>
        <button className='button' onClick={() => handlePermission(false)}>拒否する</button>
        </div>
    </div>
    );
}

export default LocationPermissionScreen;
