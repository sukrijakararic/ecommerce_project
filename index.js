const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const { PORT, SESSION_SECRET } = require("./config");
const passport = require("passport");
const session = require("express-session");

const userRouter = require("./routes/user");

// secuirty
app.use(cors());
app.use(helmet());
app.use(
  session({
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

//body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({
    Greetings: "Welcome to Pleigns! The best place to buy planes!",
    to_Make_Account_Or_Log_in:
      "Please use POST /users/register or POST /users/login. For /register please input a json of email, password, firstname and lastname and for /login please input a json of email and password. To see all users, go to GET /users. You can also GET user/:id",
    to_Change_PAssword:
      "Please use PUT /users/changePassword. For /changePassword please input a json of email and password",
    to_Delete_User:
      "Please use DELETE /users/:id to delete a user.",
    });
});

userRouter(app);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
