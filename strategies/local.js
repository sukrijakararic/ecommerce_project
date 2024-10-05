// Passport configuration for local authentication
const LocalStrategy = require("passport-local").Strategy;
const passport = require("passport");
const bcrypt = require("bcrypt");
const db = require("../db/pool");
const { getUserByEmailAndPassword } = require("../queries/user");

//The strategy being created
passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      async (email, password, done) => {
        try {
          const user = await getUserByEmailAndPassword(email);
          if (!user) {
            return done(null, false, { message: "Incorrect email or password" });
          }
  
          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (!passwordsMatch) {
            return done(null, false, { message: "Incorrect email or password" });
          }
          return done(null, user);
        } catch (err) {
          return done(err);
        }
      }
    )
  );

  
// Serialize user for session
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });


// Deserialize user from session
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await getUserById(id);
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  });

module.exports = passport;

