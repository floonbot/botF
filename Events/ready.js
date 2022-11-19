const fs = require('fs');
const loadDatabase = require("../Loaders/loadDatabase")
const loadSlashCommands = require("../Loaders/loadSlashCommands")

module.exports = async bot => {

  try {

    bot.db = await loadDatabase()
    bot.db.connect(function (err) {
      if (err) throw err;

      console.log("Connected to database")

    })

  } catch (err) {
    console.log(`
    >------------ OUPS UNE ERREUR ------------<
    
    UNE ERREUR DANS L'EVENT BASE DE DONNEE !!

    >--------------- L'ERREUR ----------------<

    ${err}
    
    >-----------------------------------------<
    `)
    fs.writeFile("./erreur.txt", `${err.stack}`, () => { return })
    let channel = await bot.channels.cache.get("1041816985920610354")
    channel.send({ content: `⚠️  UNE ERREUR DANS L'EVENT BASE DE DONNE !!`, files: [{ attachment: './erreur.txt', name: 'erreur.txt', description: "L'erreur obtenue" }] })
  }

  await loadSlashCommands(bot)

  console.log(`${bot.user.tag} est en ligne`)
}