const fs = require("fs");
const { EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require("discord.js");
const { numStr } = require('../../Fonctions/fonction');
const { serveurE } = require("../.././json/emoji.json");

module.exports = {

  name: 'serveur-list',
  description: 'Permet de voit le top5 des serveurs du bot',
  permission: "Aucune",
  dm: false,
  category: "👆🏻Information",

  async run(bot, message) {

    await message.deferReply()

    const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setLabel("Invite moi")
          .setStyle(ButtonStyle.Link)
          //Mettre le lien de ton bot
          .setURL("https://discord.com/api/oauth2/authorize?client_id=1041282190060826635&permissions=8&scope=bot")
      )

    try {

      let n = 0
      const guild = bot.guilds.cache.sort((a, b) => b.memberCount - a.memberCount).map((guild) => `**${n += 1}) __${guild.name}__ :**\n\`\`\`${numStr(guild.memberCount)} Membres\n\`\`\``).slice(0, 5).join("\n");

      let botEmbed = new EmbedBuilder()
        .setColor("#FF5D00")
        .setTitle(`Chargement de la commande server-list !!`)
        .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
        .setDescription(`${serveurE}**__Je cherche les informations sur les serveurs__** ${serveurE}

    > **Sur le serveur :** ${message.guild.name}
     
      \`Veuillez patienter\``)
        .setTimestamp()
        .setFooter({ text: "server-list" })
      await message.followUp({ embeds: [botEmbed] }).then(() => {

        const embed = new EmbedBuilder()
          .setTitle(`TOP 5 DES SERVEURS`)
          .setDescription(`${guild}`)
          .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
          .setColor("#0070FF")
          .setTimestamp()
          .setFooter({ text: "server-list" })
        setTimeout(async () => await message.editReply({ embeds: [embed], components: [row] }), 2000)
      })

    } catch (err) {
      console.log(`
      >------------ OUPS UNE ERREUR ------------<
      
      UNE ERREUR DANS LA COMMANDE SERVEUR-LIST !!

      >--------------- L'ERREUR ----------------<

      ${err}
      
      >-----------------------------------------<
      `)
      fs.writeFile("./erreur.txt", `${err.stack}`, () => { return })
      let channel = await bot.channels.cache.get("1041816985920610354")
      channel.send({ content: `⚠️ UNE ERREUR DANS LA COMMANDE SERVEUR-LIST !!`, files: [{ attachment: './erreur.txt', name: 'erreur.txt', description: "L'erreur obtenue" }] })
    }
  }
}