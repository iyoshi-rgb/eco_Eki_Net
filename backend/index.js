//requireでexpressモジュールを読み込む
const express = require('express');
//mysql2を読み込む
const mysql = require('mysql2');
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

//'/'パスにGET要求があった際に実行する処理
app.get('/', (req, res) => {
    res.send('Hello world!');
});

//'/api'パスにGET要求があった際に実行する処理
app.get('/api',(req,res) => {
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

//3001ポートでlisten
app.listen(port, () => {
  console.log(`listening on *:${port}`);
})