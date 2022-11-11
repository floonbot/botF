const fs = require("fs");
const { Emojibot} = require("../../emoji.json");
const { EmbedBuilder } = require("discord.js");

module.exports = {

    name: "bot-list",
    description: "Permet de regarder le nombre de bot.",
    permission: "Aucune",
    dm: false,
    category: "👆🏻Information",

    async run(bot, message) {

        try {

            await message.deferReply()

            const list = message.guild.members.cache.filter(m => m.user.bot).map(m => `> \`${m.user.tag}\``).join(`\n`)


            let botEmbed = new EmbedBuilder()
                .setColor("#FF5D00")
                .setTitle(`Chargement de la commande bot-info`)
                .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
                .setDescription(`${Emojibot}**__Je cherche les bots sur le serveur ${message.guild.name}__**${Emojibot}

        > **Sur le serveur :** ${message.guild.name}
         
          \`Veuillez patienter\``)
                .setTimestamp()
                .setFooter({ text: "bot-info" })

            await message.followUp({ embeds: [botEmbed] }).then(() => {

                let botEmbed = new EmbedBuilder()
                    .setTitle(`${Emojibot}Liste des bot sur le serveur${Emojibot}`)
                    .setColor("#0070FF")
                    .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
                    .setDescription(`**__Les pseudo des bots :__**
                
                 ${list}`)
                    .setFooter({ text: "Bot list" })
                    .setTimestamp()

                setTimeout(() => message.editReply({ embeds: [botEmbed] }), 2000)
            })

        } catch (err) {

            console.log(`Une erreur dans la commande bot-list.`, err);

            fs.writeFile("./erreur.txt", `${err.stack}`, () => {
                return
            })

            let channel = await bot.channels.cache.get("1038859689833791528")
            channel.send({ content: `⚠️ Une erreur est apparue ! Sur le  ${message.guild.name} !`, files: [{ attachment: './erreur.txt', name: 'erreur.txt', description: "L'erreur obtenue" }] })

        }

    }
}