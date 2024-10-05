const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { PORT, SESSION_SECRET } = require('./config');
const passport = require('passport');
const session = require('express-session');


const userRouter = require('./routes/user');

// secuirty
app.use(cors());
app.use(helmet());
app.use(session({
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
}))

app.use(passport.initialize());
app.use(passport.session());

//body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


userRouter(app);


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})