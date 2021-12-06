// server configs
const express = require("express");
const app = express();
const helmet = require("helmet");
const session = require("express-session");
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const PORT = process.env.PORT || 3002;
const routes = require("./routes/index.js");
const db = require("./routes/db");
const User = require("./models/User");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser")

app.use(helmet());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())
app.use(session({ secret: "secret" }));
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new localStrategy(
    { usernameField: "email", passwordField: "password" },
    function (email, password, done) {
      User.findOne({ where: { email: email } }).then((user) => {
        if (!user) {
          return done("Email incorrecto", false);
        }
        user.hash(password, user.salt).then(hash=>  {
          if (hash!==user.password) {
            return done("Clave incorrecta", false);
          }
          return done(null, user);
        })
      });
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findByPk(id).then((user) => done(null, user));
});

app.use("/api", routes);

db.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    const url = `http://localhost:${PORT}/`;
    console.log(`Listen to ${url}`);
  });
});
