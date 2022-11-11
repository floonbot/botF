const mysql = require("mysql")
const { USER, DATABASE, MDP, HOST } = require("../json/db.json")

module.exports = async () => {

  try {
    let db = await mysql.createConnection({

      host: HOST,
      user: USER,
      password: MDP,
      //Mettre le nom de ta database
      database: DATABASE

    })

    return db;
  } catch (err) {

    console.log("Une erreur dans les loaders dans le fichier loadDatabase", err)

  }
}