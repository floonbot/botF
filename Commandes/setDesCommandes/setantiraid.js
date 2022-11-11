const Discord = require("discord.js");

module.exports = {

    name: "setantiraid",
    description: "Paramètre le AntiRaid",
    permission: Discord.PermissionFlagsBits.ModerateMembers,
    dm: false,
    category: "🗃️Set des commande",
    options: [
        {
            type: "string",
            name: "état",
            description: "Etat du AntiRaid ?",
            required: true,
            autocomplete: true
        }
    ],
    async run(bot, message, args, db,) {

        let etat = args.getString("état")
        if (etat !== "on" && etat !== "off") return message.replye("Indique on ou off")

        try {
            if (etat === "off") {
                db.query(`UPDATE server SET antiraid = 'false' WHERE guild = '${message.guildId}'`)
                let Embed = new Discord.EmbedBuilder()
                    .setColor("#FFE800")
                    .setTitle(`SetAntiRaid`)
                    .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
                    .setDescription(`Le AntiRaid est bien désactiver \n le rôle \`Non verif\` ne sera plus donner au personne qui rejoint le serveur`)
                    .setTimestamp()
                    .setFooter({ text: "SetAntiRaid" })


                await message.reply({ embeds: [Embed] })

            } else {

                db.query(`UPDATE server SET antiraid = 'true' WHERE guild = '${message.guildId}'`)
                let Embed = new Discord.EmbedBuilder()
                    .setColor("#FFE800")
                    .setTitle(`SetAntiRaid`)
                    .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
                    .setDescription(`Le AntiRaid est bien activé.`)
                    .setTimestamp()
                    .setFooter({ text: "SetAntiRaid" })

                await message.reply({ embeds: [Embed] })

            }
        } catch (err) {

            console.log("Une erreur dans la commande setAntiRaid", err)

        }
    }
}