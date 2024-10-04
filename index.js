const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
// const { DB } = require('./config');
// const {Client} = require('pg');

const { PORT } = require('./config');

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* const db = new Client({
    user: DB.PGUSER,
    host: DB.PGHOST,
    database: DB.PGDATABASE,
    password: DB.PGPASSWORD,
    port: DB.PGPORT,
  });


const getProducts = (req, res, next) => {
    db.query('SELECT * FROM products', (err, result) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        } else {
            return res.status(200).json(result.rows);
        }

    })
}

app.get('/products', getProducts); */

app.use('/', (req, res, next) => {
    res.json({message: 'Welcome to Pleigns!'})
})


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})