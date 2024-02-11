//requireでexpressモジュールを読み込む
const express = require('express');
//mysql2を読み込む
const mysql = require('mysql2');

const session = require('express-session');
const bcrypt = require('bcrypt');
//expressモジュールを実体化して、定数appに代入
const app = express();
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

app.use(express.json());

//'/'パスにGET要求があった際に実行する処理
app.get('/', (req, res) => {
  connection.query(
    'select* from test',
    function(err,results,fields){
      if(err){
        console.log('接続エラー');
        throw err;
      }
      res.json({message: results[0].name});
    }
  )
});

app.get('/reviews', (req, res) => {
  const sqlQuery = 'SELECT * FROM reviews';
  connection.query(sqlQuery, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// 口コミ投稿
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


//'/api'パスにGET要求があった際に実行する処理
app.post('/location', (req, res) => {
  const { latitude, longitude } = req.body;
  console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
  // ここで位置情報に基づいた処理を行う

  res.json({message: '位置情報を受け取りました'});
});

app.post('/signup', 
  (req, res, next) => {
    console.log('入力値の空チェック');
    const username = req.body.username;
    const password = req.body.password;
    const errors = [];

    if (username === '') {
      errors.push('ユーザー名が空です');
    }

    if (password === '') {
      errors.push('パスワードが空です');
    }

    if (errors.length > 0) {
      res.render('signup.ejs', { errors: errors });
    } else {
      next();
    }
  },
  
  (req, res) => {
    console.log('ユーザー登録');
    const username = req.body.username;
    const password = req.body.password;
    bcrypt.hash(password, 10, (error, hash) => {
      connection.query(
        'INSERT INTO users (username, password) VALUES (?, ?)',
        [username, hash],
        (error, results) => {
          req.session.userId = results.insertId;
          req.session.username = username;
          res.redirect('/list');
        }
      );
    });
  }
);

app.post('/login', (req, res) => {
  const email = req.body.email;
  connection.query(
    'SELECT * FROM users WHERE email = ?',
    [email],
    (error, results) => {
      if (results.length > 0) {
        // 定数plainを定義してください
        const plain = req.body.password;
        
        
        // 定数hashを定義してください
        const hash = results[0].password
        
        // パスワードを比較するためのcompareメソッドを追加してください
        bcrypt.compare(plain,hash,(error,isEqual) => {
          if(isEqual){
            req.session.userId = results[0].id;
            req.session.username = results[0].username;
            res.redirect('/list');
          }else{
            res.redirect('/login');
          }
        })
      } else {
        res.redirect('/login');
      }
    }
  );
});

app.get('/logout', (req, res) => {
  req.session.destroy((error) => {
    res.redirect('/list');
  });
});

//3001ポートでlisten
app.listen(port, () => {
  console.log(`listening on *:${port}`);
})