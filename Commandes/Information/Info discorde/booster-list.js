const Discord = require("discord.js");
const { PermissionsBitField, EmbedBuilder } = require("discord.js")

module.exports = {

    name: "booster-list",
    description: "Permet de voir la liste des boosts sur le serveur.",
    permission: "Aucune",
    dm: false,
    category: "👆🏻Information",

    async run(bot, message, args, db) {

        try {

            await message.deferReply()

            const booster = message.guild.members.cache.filter(member => member.preniumSince).map(m => `> \`${m.user.tag}\``).join(`\n`) || "Auncun Utilisateur"

            let boostEmbed = new EmbedBuilder()
                .setTitle("Liste des boosts")
                .setColor("#0070FF")
                .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
                .setDescription(`**__Le nombre de boost :__**
                
                 ${booster}`)
                .setFooter({ text: "boost list" })
                .setTimestamp()

            await message.followUp({ embeds: [boostEmbed] })

        } catch (err) {

            console.log(`Une erreur dans la commande boost-list.`, err);
        }

    }
}