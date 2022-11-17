const Discord = require('discord.js');
const fs = require('fs');
const { randomE } = require("../../json/emoji.json");
const { EmbedBuilder } = require('discord.js');


module.exports = {
  name: "random",
  description: "Le bot prend au hasard un nombre entre 1 et 100",
  permission: "Aucune",
  dm: false,
  category: "🥳Fun",

  async run(bot, message) {

    await message.deferReply()

    try {

      let min = 1;
      let max = 100;
      let random = Math.floor(Math.random() * (max - min)) + min;

      let randomEmbed = new Discord.EmbedBuilder()
        .setColor("#FF5D00")
        .setTitle(`Chargement de la commande random !!`)
        .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
        .setDescription(`${randomE} **__Je choisi un nombre entre 1 et 100__** ${randomE}

                > **Sur le serveur :** ${message.guild.name}
                 
                  \`Veuillez patienter\``)
        .setTimestamp()
        .setFooter({ text: "Random" })
      await message.followUp({ embeds: [randomEmbed] })

      randomEmbed = new EmbedBuilder()
        .setTitle(`Tu as obtenue le nombre`)
        .setColor("#00A705")
        .setDescription(`> ${randomE} Tu as obtenue le nombre : \`${random}\``)
        .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
        .setTimestamp()
        .setFooter({ text: "random" })
      await message.editReply({ embeds: [randomEmbed] })

    } catch (err) {
      console.log(`
      >------------ OUPS UNE ERREUR ------------<
      
      UNE ERREUR DANS LA COMMANDE RANDOM !!

      >--------------- L'ERREUR ----------------<

      ${err}
      
      >-----------------------------------------<
      `)
      fs.writeFile("./erreur.txt", `${err.stack}`, () => { return })
      let channel = await bot.channels.cache.get("1041816985920610354")
      channel.send({ content: `⚠️ UNE ERREUR DANS LA COMMANDE RANDOM !!`, files: [{ attachment: './erreur.txt', name: 'erreur.txt', description: "L'erreur obtenue" }] })
    }
  }
}