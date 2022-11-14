const Discord = require("discord.js");
const fs = require("fs");
const { Sos, infoE } = require("../.././json/emoji.json");

module.exports = {

  name: "help",
  description: "Donne les commands du bot",
  permission: "Aucune",
  dm: false,
  category: "👆🏻Information",


  async run(bot, message) {

    let command;

    await message.deferReply()

    try {
      if (!command) {

        let categories = [];
        bot.commands.forEach(command => {
          if (!categories.includes(command.category)) categories.push(command.category)
        })

        let botEmbed = new Discord.EmbedBuilder()
          .setColor("#FF5D00")
          .setTitle(`Chargement de la commande bot-info !!`)
          .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
          .setDescription(`${Sos} **__Je cherche les commandes !!__** ${Sos}

            > **Sur le serveur :** ${message.guild.name}
             
              \`Veuillez patienter\``)
          .setTimestamp()
          .setFooter({ text: "help" })

        await message.followUp({ embeds: [botEmbed] }).then(async () => {

          let Embed = new Discord.EmbedBuilder()
            .setColor("#0070FF")
            .setTitle(`Info des commandes`)
            .setThumbnail(bot.user.displayAvatarURL({ dynamic: true }))
            .setDescription(`${infoE} **__Nombre de commandes et catégories__**

                    > Commands disponibles : \`${bot.commands.size}\`
                    > Catégories disponibles : \`${categories.length}\``)
            .setTimestamp()
            .setFooter({ text: "Commandes du bot" })

          await categories.sort().forEach(async cat => {

            let commands = bot.commands.filter(cmd => cmd.category === cat)
            Embed.addFields({ name: `${cat}`, value: `${commands.map(cmd => `\`${cmd.name}\` : ${cmd.description}`).join("\n")}` })
          })

          setTimeout(async () => await message.editReply({ embeds: [Embed] }), 2000)
        })
      }

    } catch (err) {
      console.log("Une erreur dans la commande help", err)

      fs.writeFile("./erreur.txt", `${err.stack}`, () => {
        return
      })

      let channel = await bot.channels.cache.get("1041816985920610354")
      channel.send({ content: `⚠️ Une erreur est apparue ! Sur le  ${message.guild.name} !`, files: [{ attachment: './erreur.txt', name: 'erreur.txt', description: "L'erreur obtenue" }] })
    }
  }
}
