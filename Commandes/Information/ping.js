const Discord = require("discord.js");
const fs = require("fs");
const { pingE } = require("../../emoji.json");


module.exports = {

    name: "ping",
    description: "Donne le ping du bot.",
    permission: "Aucune",
    dm: false,
    category: "👆🏻Information",

    async run(bot, message) {
        await message.deferReply()

        try {

            let pingEmbed = new Discord.EmbedBuilder()
                .setColor("#FF5D00")
                .setTitle(`Chargement de la commande ping`)
                .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
                .setDescription(`${pingE}**__Je cherche le ping du bot__**${pingE}

                > **Sur le serveur :** ${message.guild.name}, 
                
                \`veuillez patienter\`.`)
                .setTimestamp()
                .setFooter({ text: "Ping" })

            await message.followUp({ embeds: [pingEmbed] }).then(() => {

                pingEmbed = new Discord.EmbedBuilder()
                    .setColor("#0070FF")
                    .setTitle(`${pingE}La lantence du bot${pingE}`)
                    .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
                    .setDescription(`Le ping du bot est de : \`${bot.ws.ping}\` ms.`)
                    .setTimestamp()
                    .setFooter({ text: "Ping" })

                setTimeout(() => message.editReply({ embeds: [pingEmbed] }), 1000)
            })

        } catch (err) {
            console.log('Une erreur sur la commande ping', err)

            fs.writeFile("./erreur.txt", `${err.stack}`, () => {
                return
            })

            let channel = await bot.channels.cache.get("1038859689833791528")
            channel.send({ content: `⚠️ Une erreur est apparue ! Sur le  ${message.guild.name} !`, files: [{ attachment: './erreur.txt', name: 'erreur.txt', description: "L'erreur obtenue" }] })

        }
    }
}