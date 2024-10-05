const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { PORT } = require('./config');


const userRouter = require('./routes/user');

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


userRouter(app);


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})