const db = require("../routes/db");
const S = require("sequelize");
const Peliculas = require("./Peliculas");
const crypto = require("bcrypt");

class User extends S.Model {
  hash(password, salt) {
    return crypto.hash(password, salt);
  }
}
User.init(
  {
    name: {
      type: S.STRING,
    },
    password: {
      type: S.STRING,
      allowNull: false,
    },
    email: {
      type: S.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    salt: {
      type: S.STRING,
    },
  },
  {
    sequelize: db,
    modelName: "users",
  }
);
User.addHook("beforeCreate", function (user) {
  return crypto
    .genSalt(8)
    .then((salt) => {
      user.salt = salt;
      return user.hash(user.password, salt);
    })
    .then((passHeashed) => (user.password = passHeashed));
});

User.hasMany(Peliculas);

module.exports = User;
