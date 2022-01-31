const mysql = require('mysql2');
const express = require('express');
const app = express();
const PORT = 3000 || process.env.PORT;

const dbConnection = mysql.createConnection({
  user: 'root',
  password: '56505under',
  database: 'movielist',
});

dbConnection.connect();

app.use(express.static('client/dist'));
app.use(express.json());

app.get('/movies', (req, res) => {
  dbConnection.query('SELECT * FROM movies', [], (err, movies) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.json(movies);
    }
  })
})

app.post('/movies', (req, res) => {
  if (req.body.id) {
    console.log(req.body);
    dbConnection.query('UPDATE movies SET watched = ? WHERE id = ?', [req.body.watched, req.body.id], (err, result) => {
      if (err) {
        res.sendStatus(500);
      } else {
        res.sendStatus(201);
      }
    })
  } else {
    dbConnection.query('INSERT INTO movies (title, watched) VALUES (?, ?)', [req.body.title, req.body.watched], (err, movies) => {
      if (err) {
        res.sendStatus(500);
      } else {
        res.sendStatus(201);
      }
    })
  }
})

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
})