const Discord = require("discord.js");
const fs = require("fs");
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const { pingE, TimeE } = require("../.././json/emoji.json");

module.exports = {

  name: "ping",
  description: "Donne le ping du bot",
  permission: "Aucune",
  dm: false,
  category: "👆🏻Information",

  async run(bot, message) {

    await message.deferReply()

    try {

      const row = new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
            .setLabel("Actualiser")
            .setStyle(ButtonStyle.Success)
            //Mettre le lien de ton bot
            .setCustomId("Ping")
        )

      let pingEmbed = new Discord.EmbedBuilder()
        .setColor("#FF5D00")
        .setTitle(`Chargement de la commande ping !!`)
        .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
        .setDescription(`${pingE}**__Je cherche le ping du bot__**${pingE}

                > **Sur le serveur :** ${message.guild.name}, 
                
                \`veuillez patienter\`.`)
        .setTimestamp()
        .setFooter({ text: "Ping" })
      await message.followUp({ embeds: [pingEmbed] }).then(() => {

        pingEmbed = new Discord.EmbedBuilder()
          .setColor("#0070FF")
          .setTitle(`La lantence du bot`)
          .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
          .setDescription(`
                    
          > ${pingE} **Bot :** \`${bot.ws.ping}\` ms 
          > ${pingE} **API :** \`${Date.now() - message.createdTimestamp - 400}\` ms
          > ${TimeE} **Temps Uptime :** ${Math.round(bot.uptime / (1000 * 60 * 60)) + "h " + (Math.round(bot.uptime / (1000 * 60)) % 60) + "m " + (Math.round(bot.uptime / 1000) % 60) + "s "}`)
          .setTimestamp()
          .setFooter({ text: "Ping" })
        setTimeout(() => message.editReply({ embeds: [pingEmbed], components: [row] }), 1000)
      })

    } catch (err) {
      console.log(`
      >------------ OUPS UNE ERREUR ------------<
      
      UNE ERREUR DANS LA COMMANDE PING !!

      >--------------- L'ERREUR ----------------<

      ${err}
      
      >-----------------------------------------<
      `)
      fs.writeFile("./erreur.txt", `${err.stack}`, () => { return })
      let channel = await bot.channels.cache.get("1041816985920610354")
      channel.send({ content: `⚠️ UNE ERREUR DANS LA COMMANDE PING !!`, files: [{ attachment: './erreur.txt', name: 'erreur.txt', description: "L'erreur obtenue" }] })
    }
  }
}