const Discord = require("discord.js");

module.exports = {

    name: "setcaptcha",
    description: "Paramètre le captcha",
    permission: Discord.PermissionFlagsBits.ModerateMembers,
    dm: false,
    category: "🗃️Set des commande",
    options: [
        {
            type: "string",
            name: "état",
            description: "Etat du captcha ?",
            required: true,
            autocomplete: true
        },
        {
            type: "channel",
            name: "salon",
            description: "Quel est le salon pour le captcha ?",
            required: true,
            autocomplete: false
        }
    ],
    async run(bot, message, args, db,) {

        let etat = args.getString("état")
        if (etat !== "on" && etat !== "off") return message.replye("Indique on ou off")

        try {
            if (etat === "off") {
                db.query(`UPDATE server SET captcha = 'false' WHERE guild = '${message.guildId}'`)
                let Embed = new Discord.EmbedBuilder()
                    .setColor("#FFE800")
                    .setTitle(`Setcaptcha`)
                    .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
                    .setDescription(`Le captcha est bien désactiver \n le rôle \`Non verif\` ne sera plus donner au personne qui rejoint le serveur`)
                    .setTimestamp()
                    .setFooter({ text: "Setcaptcha" })


                await message.reply({ embeds: [Embed] })

            } else {

                let channel = args.getChannel("salon")
                if (!channel) return message.reply("Pas de salon Indiqué !")
                channel = message.guild.channels.cache.get(channel.id)
                if (!channel) return message.reply("Pas de salon trouvée !")

                db.query(`UPDATE server SET captcha = '${channel.id}' WHERE guild = '${message.guildId}'`)
                let Embed = new Discord.EmbedBuilder()
                    .setColor("#FFE800")
                    .setTitle(`Setcaptcha`)
                    .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
                    .setDescription(`Le captcha est bien activé sur le salon ${channel} \n\n 🔺IMPORTANT🔺\n\n \` D'avoir un rôle \` \n\n \`Non verif\` sur le serveur sans aucune permissions ( si pas le de rôle, il sera automatiquemen crée )  !! \n Dans le salon ou se trouve le captcha rajouter comme permission sur le rôle \`Non verif\`\`voir salon et envoyer un message\``)
                    .setTimestamp()
                    .setFooter({ text: "Setcaptcha" })

                await message.reply({ embeds: [Embed] })

            }
        } catch (err) {

            console.log("Une erreur dans la commande setcaptcha", err)

        }
    }
}