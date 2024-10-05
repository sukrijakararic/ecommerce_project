const express = require('express');
const userRouter = express.Router();
const { registerUser, getUserById } = require('../queries/user');

module.exports = (app) => {
    app.use('/users', userRouter);

    userRouter.post('/register', registerUser);

    userRouter.get('/:id', getUserById);

}
