const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');

const { PORT } = require('./config/config');

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', (req, res, next) => {
    res.json({message: 'Welcome to Pleigns!'})
})


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})