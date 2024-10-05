const express = require("express");
const userRouter = express.Router();
const { registerUser, showUsers } = require("../queries/user");
const passport = require("../strategies/local");

module.exports = (app) => {
  app.get("/failedLogIn", (req, res) => {
    res.json({ message: "Incorrect email or password" });
  });
  app.use("/users", userRouter);

  userRouter.get("/", showUsers);

  userRouter.post("/register", registerUser);

  userRouter.post(
    "/login",
    passport.authenticate("local", { failureRedirect: "/failedLogIn" }),
    (req, res) => {
      res.send({ message: "Logged in", user: req.user });
    }
  );

  userRouter.get("/logout", (req, res) => {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      res.redirect("/");
    });
  });
};
