const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'projeto',
});

connection.connect((error) => {
  if (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
  } else {
    console.log('Conexão com o banco de dados estabelecida.');
  }
});

app.post('/register', (req, res) => {
  const { name, email, user, password } = req.body;

  const sql = 'INSERT INTO registros (name, email, username, password) VALUES (?, ?, ?, ?)';
  connection.query(sql, [name, email, user, password], (error, result) => {
    if (error) {
      console.log('Erro ao inserir o registro no banco de dados:', error);
      res.status(500).send('Erro ao processar o registro.');
    } else {
      console.log('Registro inserido com sucesso!');
      res.status(200).send('Registro inserido com sucesso!');
    }
  });
});

app.post('/login', (req, res) => {
  const { user, pass } = req.body;

  const query = 'SELECT * FROM registros WHERE username = ? AND password = ?';
  connection.query(query, [user, pass], (error, results) => {
    if (error) {
      console.error(error);
      res.json({ success: false });
      return;
    }

    if (results.length > 0) {
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  });
});

app.listen(3300, () => {
  console.log('Servidor em execução na porta 3300');
});
