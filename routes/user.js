const express = require('express');
const userRouter = express.Router();
const registerUser = require('../queries/user');

module.exports = (app) => {
    app.use('/users', userRouter);

    userRouter.post('/register', registerUser);

}
