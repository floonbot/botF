const Discord = require("discord.js");
const fs = require("fs");
const { Floon, infoE } = require("../.././json/emoji.json");
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
            .setURL("https://discord.com/api/oauth2/authorize?client_id=1041282190060826635&permissions=8&scope=bot")
        )

      let botEmbed = new Discord.EmbedBuilder()
        .setColor("#FF5D00")
        .setTitle(`Chargement de la commande bot-info !!`)
        .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
        .setDescription(`${Floon} **__Je cherche les informations sur ${bot.user.tag}__** ${Floon}

            > **Sur le serveur :** ${message.guild.name}
             
              \`Veuillez patienter\``)
        .setTimestamp()
        .setFooter({ text: "bot-info" })
      await message.followUp({ embeds: [botEmbed] }).then(() => {

        botEmbed = new Discord.EmbedBuilder()
          .setTitle(`Les informations de ${bot.user.username}`)
          .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
          .setColor("#0070FF")
          .setDescription(`
                __**${infoE} Informations**__

                > **Développer :** \`Floon\`
                > **Name / Tag :** \`${bot.user.username}\`
                > **Tag :** \`${bot.user.discriminator}\`
                > **Ping :** \`${bot.ws.ping}\`
                > **Temps Uptime :** ${Math.round(bot.uptime / (1000 * 60 * 60)) + "h " + (Math.round(bot.uptime / (1000 * 60)) % 60) + "m " + (Math.round(bot.uptime / 1000) % 60) + "s "}
               
                __ **${infoE} Information Compte ** __

                > **Créer :** <t:${parseInt(bot.user.createdTimestamp / 1000)}:R>
               `)
        setTimeout(() => message.editReply({ embeds: [botEmbed], components: [row] }), 1000)
      })

    } catch (err) {
      console.log(`
      >------------ OUPS UNE ERREUR ------------<
      
      UNE ERREUR DANS LA COMMANDE BOT-INFO !!

      >--------------- L'ERREUR ----------------<

      ${err}
      
      >-----------------------------------------<
      `)
      fs.writeFile("./erreur.txt", `${err.stack}`, () => { return })
      let channel = await bot.channels.cache.get("1041816985920610354")
      channel.send({ content: `⚠️ UNE ERREUR DANS LA COMMANDE BOT-INFO !!`, files: [{ attachment: './erreur.txt', name: 'erreur.txt', description: "L'erreur obtenue" }] })
    }
  }
}