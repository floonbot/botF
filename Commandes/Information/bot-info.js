const Discord = require("discord.js");
const fs = require("fs");
const { Floon } = require("../../emoji.json");
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");


module.exports = {

    name: "bot-info",
    description: "Les informations sur le bot",
    dm: false,
    category: "👆🏻Information",

    async run(bot, message) {

        await message.deferReply()

        try {

            const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setLabel("Invite moi")
                        .setStyle(ButtonStyle.Link)
                        //Mettre le lien de ton bot
                        .setURL("https://discord.com/api/oauth2/authorize?client_id=1010537525435183166&permissions=8&scope=bot%20applications.commands")
                )

            let botEmbed = new Discord.EmbedBuilder()
                .setColor("#FF5D00")
                .setTitle(`Chargement de la commande bot-info`)
                .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
                .setDescription(`${Floon}**__Je cherche les informations sur ${bot.user.tag}__**${Floon}

            > **Sur le serveur :** ${message.guild.name}
             
              \`Veuillez patienter\``)
                .setTimestamp()
                .setFooter({ text: "bot-info" })

            await message.followUp({ embeds: [botEmbed] }).then(() => {

                botEmbed = new Discord.EmbedBuilder()
                    .setTitle(`${Floon} botInfo de ${bot.user.username} ${Floon}`)
                    .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
                    .setColor("#0070FF")
                    .setDescription(`
                __**👆🏻Informations**__

                > **Développer :** \`Floon\`
                > **Name / Tag :** \`${bot.user.username}\`
                > **Tag :** \`${bot.user.discriminator}\`
                > **Ping :** \`${bot.ws.ping}\`
                > **Temps Uptime :** ${Math.round(bot.uptime / (1000 * 60 * 60)) + "h " + (Math.round(bot.uptime / (1000 * 60)) % 60) + "m " + (Math.round(bot.uptime / 1000) % 60) + "s "}
               
                
                __ ** 👆🏻Information Compte ** __


                > **Créer :** <t:${parseInt(bot.user.createdTimestamp / 1000)}:R>
               `)

                setTimeout(() => message.editReply({ embeds: [botEmbed], components: [row] }), 1000)
            })

        } catch (err) {

            console.log(`Une erreur dans le commande bot-info`, err)

            fs.writeFile("./erreur.txt", `${err.stack}`, () => {
                return
            })

            let channel = await bot.channels.cache.get("1038859689833791528")
            channel.send({ content: `⚠️ Une erreur est apparue ! Sur le  ${message.guild.name} !`, files: [{ attachment: './erreur.txt', name: 'erreur.txt', description: "L'erreur obtenue" }] })
        }
    }
}