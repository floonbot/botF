const mysql = require("mysql")
const { USER, DATABASE, MDP, HOST } = require("../json/db.json")

module.exports = async () => {

  try {

    let db = await mysql.createConnection({

      host: HOST,
      user: USER,
      password: MDP,
      database: DATABASE
    })

    return db

  } catch (err) {
    console.log(`
    >------------ OUPS UNE ERREUR ------------<
    
    UNE ERREUR DANS LOADERS DANS LOADDATABASE !!

    >--------------- L'ERREUR ----------------<

    ${err}
    
    >-----------------------------------------<
    `)
    fs.writeFile("./erreur.txt", `${err.stack}`, () => { return })
    let channel = await bot.channels.cache.get("1041816985920610354")
    channel.send({ content: `⚠️ UNE ERREUR DANS LOADERS DANS LOADDATABASE !!`, files: [{ attachment: './erreur.txt', name: 'erreur.txt', description: "L'erreur obtenue" }] })
  }
}