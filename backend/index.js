//requireでexpressモジュールを読み込む
const express = require('express');
//mysql2を読み込む
const mysql = require('mysql2');

const session = require('express-session');
const bcrypt = require('bcrypt');
const axios = require('axios');
//expressモジュールを実体化して、定数appに代入
const app = express();
//ポート番号を指定
const port = 3001;

const GOOGLE_MAPS_API_KEY = 'AIzaSyCSSgLb--mfJ0ISN-wnGRpLYEzFfnXR9rI';

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

app.use(express.json());

app.get('/reviews', (req, res) => {
  const sqlQuery = 'SELECT * FROM reviews';
  connection.query(sqlQuery, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.get('write',(req,res) => {
  const sqlQuery = 'SELECT* FROM stationName';
  connection.query(sqlQuery,(err,result) => {
    if(err) throw err;
    res.send(result);
  });
});

app.post('/reviews', (req, res) => {
  const newReview = { content: req.body.content};
  const sqlQuery = 'INSERT INTO reviews SET ?';
  connection.query(sqlQuery, newReview, (err, result) => {
    if (err) throw err;
    res.send('口コミが投稿されました');
  });
});

app.post('/co2',(req,res) => {
  console.log(req.body); // 受け取ったデータをコンソールに表示 
  const start = req.body.firstChoice;
  const goal = req.body.secondChoice;

  const sqlQuery = 'SELECT* from stationName WHERE name=?'
  connection.query(sqlQuery,start,(err,result) => {
    if(err)throw err;
    console.log(result[0][goal]);
    
  })
  res.status(200).json({message: "データを受け取りました"});
});


//最寄り駅
/*app.post('/find-nearest-station', async (req, res) => {
  const { latitude, longitude } = req.body;
  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=1500&type=train_station&key=${GOOGLE_MAPS_API_KEY}`;

  try {
    const response = await axios.get(url);
    res.send(response.data);
    console.log(response.data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Server Error');
  }
});
*/




//3001ポートでlisten
app.listen(port, () => {
  console.log(`listening on *:${port}`);
})