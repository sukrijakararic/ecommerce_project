const express = require('express');
const userRouter = express.Router();
const { registerUser } = require('../queries/user');
const passport = require('../strategies/local');

module.exports = (app) => {
    app.use('/users', userRouter);


    userRouter.get('/', (req, res) => {
        res.json({message: 'Please use /register or /login. For /register please input a json of email, password, firstname and lastname and for /login please input a json of email and password.'});
    });

    userRouter.post('/register', registerUser);

    userRouter.post('/login', passport.authenticate('local', {failureRedirect: '/login'}), (req, res) => {
        res.send({message: 'Logged in', user: req.user});
    });

    userRouter.get('/logout', (req, res) => {
        req.logout((err) => {
          if (err) {
            return next(err);
          }
          res.redirect('/login');
        });
      });

}
