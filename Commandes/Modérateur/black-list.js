const Discord = require("discord.js");
const fs = require("fs");
const { stopE, modoE, serveurE, userE, gaming, textE } = require("../../json/emoji.json");


module.exports = {

  name: "black-list",
  description: "Affiche les membres blacklist",
  permission: Discord.PermissionFlagsBits.ModerateMembers,
  dm: false,
  category: "🧑🏻‍⚖️Modération",

  async run(bot, message, args, db) {

    try {

      db.query(`SELECT * FROM blacklists WHERE guildId = '${message.guildId}'`, async (err, req) => {

        await message.deferReply()

        let pingEmbed = new Discord.EmbedBuilder()
          .setColor("#FF5D00")
          .setTitle(`Chargement de la commande black_list !!`)
          .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
          .setDescription(`${stopE} **__Je cherche le membre a black list__** ${stopE}
    
                > **Sur le serveur :** ${message.guild.name}, 
                
                \`veuillez patienter\`.`)
          .setTimestamp()
          .setFooter({ text: "Black-list" })
        await message.followUp({ embeds: [pingEmbed] }).then(() => {

          let embed_description = ""
          let Embed = new Discord.EmbedBuilder()
            .setColor("#FF0000")
            .setTitle(`Liste des blacklists des membres`)
            .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
            .setTimestamp()
            .setFooter({ text: "Blacklist" })

          for (let i = 0; i < req.length; i++) {
            embed_description = embed_description + `

                    > ${serveurE} **Serveur :** \`${req[i].guild}\`
                    > ${userE} **Membre :** \`${req[i].usertag} \`
                    > ${userE} **Pseudo dans le jeux :** \`${req[i].pseudo}\`
                    > ${gaming} **Jeux :** \`${req[i].jeux}\`
                    > ${textE} **Raison :** \`${req[i].reason}\``
          }

          if (embed_description === "") {
            embed_description = "La blackliste est vide !"
          }
          Embed.setDescription(embed_description)
          setTimeout(async () => await message.editReply({ embeds: [Embed] }), 3000)
        })
      })

    } catch (err) {
      console.log(`
      >------------ OUPS UNE ERREUR ------------<
      
      UNE ERREUR DANS LA COMMANDE BLACK-LIST !!

      >--------------- L'ERREUR ----------------<

      ${err}
      
      >-----------------------------------------<
      `)
      fs.writeFile("./erreur.txt", `${err.stack}`, () => { return })
      let channel = await bot.channels.cache.get("1041816985920610354")
      channel.send({ content: `⚠️ UNE ERREUR DANS LA COMMANDE BLACK-LIST !!`, files: [{ attachment: './erreur.txt', name: 'erreur.txt', description: "L'erreur obtenue" }] })
    }
  }
}