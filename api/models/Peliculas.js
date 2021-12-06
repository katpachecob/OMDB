const db = require("../routes/db");
const S = require("sequelize");
const User = require("./User")

class Peliculas extends S.Model{}

Peliculas.init({
    name: {
        type: S.STRING,
      },
    year: {
        type: S.STRING,
    },
    imdbID:{
        type: S.STRING,
    },
    url:{
        type: S.STRING,
    }
},{
    sequelize: db,
    modelName: "peliculas"
})



module.exports=Peliculas