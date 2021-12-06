const Sequelize = require("sequelize")

const db = new Sequelize("omdb","katherinepacheco","1234",{
    host:"localhost",
    dialect:"postgres",
    logging: false
})

module.exports =  db