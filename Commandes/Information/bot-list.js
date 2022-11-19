const fs = require("fs");
const { Emojibot } = require("../.././json/emoji.json");
const { EmbedBuilder } = require("discord.js");

module.exports = {

  name: "bot-list",
  description: "Permet de regarder le nombre de bot",
  permission: "Aucune",
  dm: false,
  category: "👆🏻Information",

  async run(bot, message) {

    try {

      await message.deferReply()

      const list = message.guild.members.cache.filter(m => m.user.bot).map(m => `> \`${m.user.tag}\``).join(`\n`)

      let botEmbed = new EmbedBuilder()
        .setColor("#FF5D00")
        .setTitle(`Chargement de la commande bot-list !!`)
        .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
        .setDescription(`${Emojibot} **__Je cherche les bots sur le serveur ${message.guild.name}__** ${Emojibot}

        > **Sur le serveur :** ${message.guild.name}
         
          \`Veuillez patienter\``)
        .setTimestamp()
        .setFooter({ text: "bot-list" })
      await message.followUp({ embeds: [botEmbed] }).then(() => {

        let botEmbed = new EmbedBuilder()
          .setTitle(`Liste des bot sur le serveur`)
          .setColor("#0070FF")
          .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
          .setDescription(`${Emojibot} **__Les pseudo des bots :__**
                
                 ${list}`)
          .setFooter({ text: "Bot list" })
          .setTimestamp()
        setTimeout(() => message.editReply({ embeds: [botEmbed] }), 2000)
      })

    } catch (err) {
      console.log(`
      >------------ OUPS UNE ERREUR ------------<
      
      UNE ERREUR DANS LA COMMANDE BOT-LIST !!

      >--------------- L'ERREUR ----------------<

      ${err}
      
      >-----------------------------------------<
      `)
      fs.writeFile("./erreur.txt", `${err.stack}`, () => { return })
      let channel = await bot.channels.cache.get("1041816985920610354")
      channel.send({ content: `⚠️ UNE ERREUR DANS LA COMMANDE BOT-LIST !!`, files: [{ attachment: './erreur.txt', name: 'erreur.txt', description: "L'erreur obtenue" }] })
    }
  }
}