const Discord = require('discord.js');
const fs = require("fs");
const { dé } = require("../.././json/emoji.json");
const { EmbedBuilder } = require('discord.js');

module.exports = {

  name: "dé",
  description: "Permet de faire choisir le bot entre 1 et 6",
  permission: "Aucune",
  category: "🥳Fun",
  dm: false,

  async run(bot, message) {

    try {

      let min = 1;
      let max = 6;
      let random = Math.floor(Math.random() * (max - min)) + min;

      await message.deferReply()

      let déEmbed = new Discord.EmbedBuilder()
        .setColor("#FF5D00")
        .setTitle(`Chargement de la commande dé !!`)
        .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
        .setDescription(`${dé} **__Je lance le dé__** ${dé}
                
                > **Sur le serveur :** ${message.guild.name}
                
                \`Veuillez patienter\``)
        .setTimestamp()
        .setFooter({ text: "Dé" })
      await message.followUp({ embeds: [déEmbed] }).then(() => {

        déEmbed = new EmbedBuilder()
          .setTitle(`Tu as obtenue un chiffre`)
          .setColor("#00A705")
          .setDescription(`> ${dé} Tu as obtenue le chiffre : \`${random}\``)
          .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
          .setTimestamp()
          .setFooter({ text: "Dé" })
        setTimeout(async () => await message.editReply({ embeds: [déEmbed] }), 1000)
      })

    } catch (err) {
      console.log(`
      >------------ OUPS UNE ERREUR ------------<
      
      UNE ERREUR DANS LA COMMANDE Dé !!

      >--------------- L'ERREUR ----------------<

      ${err}
      
      >-----------------------------------------<
      `)
      fs.writeFile("./erreur.txt", `${err.stack}`, () => { return })
      let channel = await bot.channels.cache.get("1041816985920610354")
      channel.send({ content: `⚠️ UNE ERREUR DANS LA COMMANDE Dé !!`, files: [{ attachment: './erreur.txt', name: 'erreur.txt', description: "L'erreur obtenue" }] })
    }
  }
}