const express = require('express');
const mysql = require('mysql2');

const bcrypt = require('bcrypt');
//const axios = require('axios');

const app = express();

const datastore = require('./datastore');

//ポート番号を指定
const port = 3001;

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'kiku1634',
  database: 'eco_Eki_Net'
})

connection.connect(err => {
  if (err) {
    console.error('データベース接続エラー: ', err);
    return;
  }
  console.log('データベースに接続されました...');
});

//距離計算
function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  var R = 6371; // 地球の半径 (km)
  var dLat = deg2rad(lat2-lat1);
  var dLon = deg2rad(lon2-lon1);
  var a =
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon/2) * Math.sin(dLon/2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = R * c; // 距離 (km)
  return d;
}
//

function calculateCO2EmissionsComparison(distance) {
  // 平均的な二酸化炭素排出量 (gCO2/km)
  const emissionsPerKm = {
      car: 120, // 車
      subway: 35 // 地下鉄
  };

  // 車での移動による二酸化炭素排出量を計算
  const carEmissions = distance * emissionsPerKm.car;
  
  // 地下鉄での移動による二酸化炭素排出量を計算
  const subwayEmissions = distance * emissionsPerKm.subway;
  
  // 車と地下鉄の排出量の差を計算
  const difference = carEmissions - subwayEmissions;

  // 結果をオブジェクトで返す
  return {
      carEmissions,
      subwayEmissions,
      difference
  };
}

app.use(express.json());

//口コミ一覧
app.get('/reviews', (req, res) => {
  let sqlQuery = 'SELECT * FROM reviews';
  const params = [];
  const { stationName, stationCategory } = req.query;

  if (stationName) {
      sqlQuery += ' WHERE stationName = ?';
      params.push(stationName);
  } else if (stationCategory) {
      sqlQuery += ' WHERE category = ?';
      params.push(stationCategory);
  }

  connection.query(sqlQuery, params, (err, results) => {
      if (err) {
          console.error('Error fetching reviews:', err);
          res.status(500).send('Server error');
          return;
      }
      res.json(results);
  });
});


//投稿
app.post('/reviews', (req, res) => {
  const { content, firstChoice, userLatitude, userLongitude } = req.body;
  const sqlQuery = 'SELECT * FROM stationLocation WHERE name = ?';

  const loginuser = datastore.get('loginUser');
  console.log(loginuser);
  
  connection.query(sqlQuery, firstChoice, (err, result) => {
    if (err) throw err;

    if (result.length > 0) {
      const stationLatitude = result[0].latitude;
      const stationLongitude = result[0].longitude;
      const stationCategory = result[0].category
      const distance = getDistanceFromLatLonInKm(userLatitude, userLongitude, stationLatitude, stationLongitude);

      if (distance <= 2) {
        const query = 'INSERT INTO reviews (content, stationName,postuser,category) VALUES (?, ?, ?, ?)';
        connection.query(query, [content, firstChoice, loginuser,stationCategory], (error, results) => {
          if (error) {
            console.error('An error occurred:', error);
            return res.status(500).send('Server error');
          }
          console.log('Inserted data:', results);
          res.status(201).send('Review added');
        });
      } else {
        res.send({message: '現在地から遠すぎます'});
      }
    } else {
      res.status(404).send({message: 'Station not found'});
    }
  });
});

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}
//

//各駅の距離計算・二酸化炭素量を計算
app.post('/co2',(req,res) => {
  console.log(req.body); // 受け取ったデータをコンソールに表示 
  const start = req.body.firstChoice;
  const goal = req.body.secondChoice;

  console.log(start);

  datastore.set('globalStart',start);

  const query = 'SELECT japanese from station WHERE english=?'
  connection.query(query,goal,(err,result) => {
    if (err)throw err;
    console.log(result[0].japanese);
    datastore.set('globalGoal',result[0].japanese);
  });

  const sqlQuery = 'SELECT ?? from stationName WHERE name=?'
  connection.query(sqlQuery,[goal,start],(err,result) => {
    if(err)throw err;
    //console.log(result[0][goal]);

    if (result.length > 0) {
            const data = result[0][goal];
            console.log(data)
            const emissionsComparison = calculateCO2EmissionsComparison(data);
            console.log(emissionsComparison);
            datastore.set('emissions',emissionsComparison);
            res.json({ data,emissionsComparison });
        } else {
            res.status(404).send('Data not found');
        }
    });
});
//

//駅通過判定API
app.get('/trace', async (req,res) =>{
  const traceStart = datastore.get('globalStart');
  const traceGoal = datastore.get('globalGoal');

  console.log(traceStart,traceGoal);

  try {
    const [startLocation] = await new Promise((resolve, reject) => {
    connection.query('SELECT * FROM stationLocation WHERE name = ?',[traceStart],(err,result) => {
    if(err)reject(err);
    else resolve(result);
    console.log(result);
    });
  });

  const [goalLocation] = await new Promise((resolve, reject) => {
    connection.query('SELECT * FROM stationLocation WHERE name = ?', [traceGoal], (err, result) => {
      if (err) reject(err);
      else resolve(result);
      console.log(result);
    });
  });

  res.json({
    startLocation: {
      name : startLocation.name,
      latitude: startLocation.latitude,
      longitude: startLocation.longitude,
    },
    goalLocation: {
      name : goalLocation.name,
      latitude: goalLocation.latitude,
      longitude: goalLocation.longitude,
    }
  });
} catch (err) {
  console.error(err);
  res.status(500).send('Server error');
}
});
//

//地点移動が完了したら
app.post('/complete',(req,res) => {
  console.log('hello')
  const sqlQuery = 'SELECT point FROM users WHERE username = ?';
  const loginuser = datastore.get('loginuser');
  console.log(loginuser);

  connection.query(sqlQuery,loginuser,(err,result) => {
    if(err)throw(err);
    let point = result[0].point;
    console.log(point);
    const emissions = datastore.get('emissions')
    let reduseEmission = emissions.difference;
    console.log(reduseEmission);

    point += reduseEmission/100;
    
    console.log(point);
    
    connection.query('UPDATE users SET point = ? ,co2 = ? WHERE username = ?', [point,reduseEmission, loginuser], (err, Result) => {
      if (err) throw err;
      // You might want to send a response back to the client to indicate success
      res.json({ success: true, message: 'Points updated successfully.' });
    });
  });
});

//最寄り駅取得
app.post('/location', (req, res) => {
  const { latitude, longitude } = req.body;
  console.log('Received location:', latitude, longitude);
  const sqlQuery = 'SELECT* FROM stationLocation';
  connection.query(sqlQuery,(err,results) => {
    if(err)throw err;
    
    let nearestDistance = Infinity; // 最小距離を無限大で初期化
    let nearestLocation = null; // 最も近い場所を格納する変数

    for (const result of results) {
      var latitudeDiff = Math.abs(latitude - result.latitude); // 緯度の差の絶対値
      var longitudeDiff = Math.abs(longitude - result.longitude); // 経度の差の絶対値
      //console.log(latitudeDiff,longitudeDiff);

      var answer = latitudeDiff+longitudeDiff
    
      if (answer < nearestDistance) {
        nearestDistance = answer;
        nearestLocation = {name: result.name};
  }
}
//console.log(nearestLocation.name); 
if (nearestLocation) {
  //console.log(nearestLocation.name);
  // 最も近い場所の名前をクライアントに送り返す
  res.json({ nearestLocation: nearestLocation.name });
} else {
  // 最も近い場所が見つからない場合
  res.status(404).json({ message: "No locations found." });
}
});
});
//



// 新規登録
app.post('/register', (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 8);

  connection.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], (error, results, fields) => {
      if (error) {
          return res.status(500).send('ユーザ登録に失敗しました。');
      }
      res.status(201).send('ユーザ登録が完了しました。');
  });
});


// ログイン
app.post('/login', (req, res) => {
  // リクエストからユーザー名とパスワードを取得
  const { username, password } = req.body;

  // データベースからユーザーを検索
  connection.query('SELECT * FROM users WHERE username = ?', [username], (error, results, fields) => {
    if (error) {
      // データベースエラー
      return res.status(500).send('サーバーでエラーが発生しました。');
    }
    if (results.length === 0) {
      // ユーザーが見つからない場合
      return res.status(401).send('認証に失敗しました。');
    }

    // データベースに保存されているハッシュ化されたパスワードを取得
    const hashedPassword = results[0].password;

    // 入力されたパスワードとハッシュ化されたパスワードを比較
    bcrypt.compare(password, hashedPassword, (err, isMatch) => {
      if (err) {
        // 比較中にエラーが発生した場合
        return res.status(500).send('認証中にエラーが発生しました。');
      }
      if (!isMatch) {
        // パスワードが一致しない場合
        return res.status(401).send('認証に失敗しました。');
      }

      // 認証成功
      datastore.set('loginUser',username);
      res.status(200).send('認証成功。');
    });
  });
});

//

app.post('/staff-login', (req, res) => {
  const { stationName, password} = req.body;

  connection.query('SELECT * FROM stationStaff WHERE stationName = ?', [stationName], (error, results) => {
      if (error) {
          return res.status(500).send('Server error');
      }
      if (results.length === 0) {
          return res.status(401).send('Invalid station name or password.');
      }

      // パスワードの検証
      const hashedPassword = results[0].password;
      bcrypt.compare(password, hashedPassword, (err, isMatch) => {
          if (err) {
              return res.status(500).send('Authentication error.');
          }
          if (!isMatch) {
              return res.status(401).send('Invalid station name or password.');
          }

          // 認証成功
          datastore.set('stationName',stationName);
          res.status(200).send('Login successful');
      });
  });
});

// reviewsルートでGETリクエストを処理する
app.get('/stationReviews', (req, res) => {
  console.log('hello');
  // クエリパラメータからstationNameを取得
  const stationName = datastore.get('stationName')
  console.log(stationName)

  const sqlQuery = 'SELECT * FROM reviews WHERE stationName = ?';
  connection.query(sqlQuery, [stationName], (error, results) => {
      if (error) {
          return res.status(500).send('データの取得に失敗しました。');
      }
      // 取得したデータをJSON形式で返す
      res.json(results);
  });
});

// Expressのルーター設定例

// POST /review/thank に対するハンドラ
app.post('/review/thank', (req, res) => {
  const { reviewId } = req.body; // リクエストボディからreviewIdを取得
  console.log(reviewId);

  const sqlQuery = 'SELECT postuser,contribution FROM reviews WHERE id = ?';
  const pointQuery = 'SELECT point FROM users WHERE username = ?';

  connection.query(sqlQuery, reviewId, (err, result) => {
    if (err) throw err;
    const user = result;
    const postuser = user[0].postuser;
    let boolean = user[0].contribution;
    console.log(boolean);
    console.log(postuser);

    connection.query(pointQuery, postuser, (err, pointResult) => {
      if (err) throw err;
      console.log(pointResult[0].point);
      let nowPoint = pointResult[0].point; // Use `let` instead of `const`
      nowPoint += 1;
      boolean = 1;

      // Correct the usage of parameters in connection.query for UPDATE
      connection.query('UPDATE reviews SET contribution = ? WHERE id = ?', [boolean, reviewId], (err, Result) => {
        if (err) throw err;
        // You might want to send a response back to the client to indicate success
      });
      
      connection.query('UPDATE users SET point = ? WHERE username = ?', [nowPoint, postuser], (err, updateResult) => {
        if (err) throw err;
        // You might want to send a response back to the client to indicate success
        res.json({ success: true, message: 'Points updated successfully.' });
      });
    });
  });
});

app.get('/mypage', (req, res) => {
  const loginuser = datastore.get('loginUser');
  console.log(loginuser);

  const sqlQuery = 'SELECT* FROM users WHERE username = ?';
  
  connection.query(sqlQuery,loginuser,(err,result) => {
    if(err)throw(err);
    console.log(result);
    res.json(result[0]);
  });
});


//3001ポートでlisten
app.listen(port, () => {
  console.log(`listening on *:${port}`);
})