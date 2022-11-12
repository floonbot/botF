const Discord = require('discord.js')
const { EmbedBuilder } = require("discord.js")

module.exports = {

    name: "suggest",
    description: "Permet d'envoyer une suggestion",
    permission: "Aucune",
    dm: false,
    category: "👆🏻Information",
    options: [
        {
            type: "string",
            name: "texte",
            description: "Le message a envoyer.",
            required: true,
            autocomplete: false
        }
    ],

    async run(bot, message, args, db) {

        try {
            db.query(`SELECT * FROM suggests WHERE guildId = '${message.guild.id}'`, async (err, req) => {

                if (req.length < 1 || Boolean(req[0].suggest) === false) return

                let channel = bot.channels.cache.get(req[0].suggest)
                if (!channel) { return message.reply("Pas de salon pour la suggestion fait un /setsuggest.") };

                let msg = args.getString("texte");

                const EmbedMessage = new EmbedBuilder()

                    .setTitle(`Nouvelle suggestion!`)
                    .setColor("#0070FF")
                    .setThumbnail(message.user.displayAvatarURL({ dynamic: true, size: 64 }))
                    .setDescription(`Suggestion de ${message.user} : ${msg}`)
                    .setTimestamp()
                    .setFooter({ text: "suggest" })

                channel.send({ embeds: [EmbedMessage] }).then(function (message) {
                    message.react("✅")
                    message.react("❌")
                });
            })
        } catch (err) {

            console.log("Une erreur dans la commande suggest", err)

        }
    }
}