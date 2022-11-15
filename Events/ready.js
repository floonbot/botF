const fs = require('fs');
const loadDatabase = require("../Loaders/loadDatabase")
const loadSlashCommands = require("../Loaders/loadSlashCommands")
const { ActivityType } = require("discord.js")


module.exports = async bot => {

  try {
    bot.user.setPresence({
      activities: [{ name: "de Floon", type: ActivityType.Streaming, url: "https://www.twitch.tv/skfloon" }],
      status: 'dnd',
    });
  } catch (err) {

    console.log("Une erreur dans l'event ready pour la presence du bot.", err)

  }

  try {
    bot.db = await loadDatabase()
    bot.db.connect(function (err) {
      if (err) throw err;

      console.log("Connected to database")
    })
  } catch (err) {

    console.log("Une erreur dans l'event ready pour la base de donnée.", err)

    fs.writeFile("./erreur.txt", `${err.stack}`, () => {
      return
    })

    let channel = await bot.channels.cache.get("1041816985920610354")
    channel.send({ content: `⚠️ Une erreur est apparue ! Sur le  ${message.guild.name} !`, files: [{ attachment: './erreur.txt', name: 'erreur.txt', description: "L'erreur obtenue" }] })


  }

  await loadSlashCommands(bot)


  console.log(`${bot.user.tag} est en ligne`)
}