const fs = require('fs')
const libquery = require('libquery')
const { EmbedBuilder } = require("discord.js")
const { steve } = require('../.././json/emoji.json')

module.exports = {

  name: "ip",
  description: "Permet d'avoir l'ip du serveur",
  permission: "Aucune",
  dm: false,
  category: "👆🏻Information",

  async run(bot, message) {

    await message.deferReply()

    try {

      let botEmbed = new EmbedBuilder()
        .setColor("#FF5D00")
        .setTitle(`Chargement de la commande ip !!`)
        .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
        .setDescription(`${steve} **__Je cherche les informations sur le serveur minecraft__** ${steve}

            > **Sur le serveur :** ${message.guild.name}
             
              \`Veuillez patienter\``)
        .setTimestamp()
        .setFooter({ text: "ip" })

      await message.followUp({ embeds: [botEmbed] }).then(() => {

        libquery.query(`sulfuritium.fr`, 19132, 1000).then((data) => {
          const onembed = new EmbedBuilder()
            .setTitle(`Statut`)
            .setColor("#0070FF")
            .setThumbnail(url = "https://cdn.discordapp.com/attachments/837807770395869195/944521377334063124/MOSHED-2022-2-5-10-43-29.gif")
            .setDescription(`> 📡 | Statut: **Online (🟢)**
        > 📌 | IP: sulfuritium.fr
        > 🔗 | Port: 19132
        > 👥 | Nombre de joueur en ligne: **${data.online}/${data.max}**`)
            .setTimestamp()

          setTimeout(() => message.editReply({ embeds: [onembed] }), 2500)
        }).catch(() => {
          const offembed = new EmbedBuilder()
            .setTitle(`Statut`)
            .setColor("#0070FF")
            .setThumbnail(url = "https://cdn.discordapp.com/attachments/837807770395869195/944521377334063124/MOSHED-2022-2-5-10-43-29.gif")
            .setDescription(`> 📡 | Statut: **Offline (🔴)**
        > 📌 | IP: sulfuritium.fr
        > 🔗 | Port: 19132
        > 👥 | Nombre de joueur en ligne: **??/??**`)
            .setTimestamp()
          setTimeout(() => message.editReply({ embeds: [offembed] }), 2000)
        });
      })
    } catch (err) {

      console.log("Une erreur dans la commande ip.", err)

      fs.writeFile("./erreur.txt", `${err.stack}`, () => {
        return
      })

      let channel = await bot.channels.cache.get("1038859689833791528")
      channel.send({ content: `⚠️ Une erreur est apparue ! Sur le  ${message.guild.name} !`, files: [{ attachment: './erreur.txt', name: 'erreur.txt', description: "L'erreur obtenue" }] })
    }
  }
}
