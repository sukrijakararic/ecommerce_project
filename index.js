const express = require('express');
const app = express();
const cors = require('cors');

const { PORT } = require('./config');

app.use(cors());

app.use('/', (req, res, next) => {
    res.send('Hello World!')
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})