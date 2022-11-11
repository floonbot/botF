const Discord = require("discord.js")

module.exports = async (bot, guild,) => {

    try {
        let db = bot.db;


        db.query(`SELECT * FROM server WHERE guild = '${guild.id}'`, async (err, req) => {

            if (req.length < 1) {

                db.query(`INSERT INTO server (guild, captcha, logs, antiraid) VALUES (${guild.id},'false','false','false')`)

            }
        })
    } catch (err) {

        console.log("Une erreur dans l'event guildCreate pour la création du captcha, logs et antiraid.", err)

    }
}
