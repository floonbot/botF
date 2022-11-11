const Discord = require("discord.js")
const loadDatabase = require("../Loaders/loadDatabase")
const loadSlashCommands = require("../Loaders/loadSlashCommands")
const { ActivityType } = require("discord.js")
const { EmbedBuilder } = require("discord.js")


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

    }

    await loadSlashCommands(bot)


    console.log(`${bot.user.tag} est en ligne`)
}