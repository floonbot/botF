const Discord = require("discord.js");
const { EmbedBuilder } = require("discord.js")

module.exports = {

    name: "user-info",
    description: "Permet de voir les informations d'un membre.",
    dm: false,
    category: "👆🏻Information",
    options: [
        {
            type: "user",
            name: "membre",
            description: "Quel membre ?",
            required: true
        },
    ],

    async run(bot, message, args) {

        await message.deferReply()

        try {

            const member = message.options.getMember("membre");

            let userEmbed = new Discord.EmbedBuilder()
                .setColor("#FF5D00")
                .setTitle(`Chargement de la commande user-info.`)
                .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
                .setDescription(`Je cherche les inforamations du membre ${member.user.tag} veuillez patienter.`)
                .setTimestamp()
                .setFooter({ text: "User-info" })

            await message.followUp({ embeds: [userEmbed] })

            userEmbed = new Discord.EmbedBuilder()
                .setTitle(`UserInfo de ${member.user.tag}.`)
                .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
                .setColor("#0070FF")
                .setDescription(`
                __**Informations**__

                > **Name/Tag :** \`${member.user.tag}\`,
                > **ID :** \`${member.user.id}\`,
                > **Bot :** ${member.user.bot ? ':white_check_mark:' : '❌'}

                __ ** 👆🏻Information Compte ** __

                > **Créer :** <t:${parseInt(member.user.createdTimestamp / 1000)}:R>
                > **A rejoin :** <t:${parseInt(member.joinedAt / 1000)}:R>`)
            await message.editReply({ embeds: [userEmbed] })

        } catch (err) {

            console.log(`Une erreur dans le commande user-info`, err)

        }
    }
}