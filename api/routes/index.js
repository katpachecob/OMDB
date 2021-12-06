const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/User");
const Peliculas = require("../models/Peliculas");

//ROUTES DE PROFILE
 

router.get("/me", (req, res) => {
  req.user ? res.send(req.user) : res.sendStatus(401);
});

router.post("/login", passport.authenticate("local"), (req, res) => {
  res.send(req.user);
});

router.post("/register", (req, res, next) => {
  User.create(req.body)
    .then((user) => res.status(201).json(user))
    .catch(next);
});

router.post("/logout", (req, res) => {
  res.sendStatus(204);
});

//ROUTES PARA AÑADIR PELICULA

router.post("/my/movies/:userID", (req, res, next) => {
  User.findOne({ where: { id: req.params.userID } })
    .then((user) => {
      Peliculas.create({
        name: req.body.name,
        year: req.body.year,
        imdbID: req.body.imdbID,
        userId: user.dataValues.id,
        url: req.body.url,
      });
    })
    .then((creado) => res.send(creado).status(201));
});

router.get("/my/movies/:userID", (req, res, next) => {
  Peliculas.findAll({ where: { userId: req.params.userID } })
    .then((movies) => res.send(movies))
    .catch(next);
});

router.delete("/my/movies/:userID", (req, res, next) => {
  console.log("Req.BODY",req.body)
  Peliculas.destroy({ where: { userId: req.params.userID, imdbID: req.body.imdbID } })

    .then((movies) => res.sendStatus(202))
    .catch(next);
});
module.exports = router;
