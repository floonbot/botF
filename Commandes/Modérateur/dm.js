const Discord = require("discord.js");
const fs = require("fs");
const { textE } = require("../.././json/emoji.json");


module.exports = {

  name: "dm",
  description: "DM un membre",
  category: "🧑🏻‍⚖️Modération",
  permission: Discord.PermissionFlagsBits.ModerateMembers,
  dm: false,
  options: [
    {
      name: "membre",
      type: "user",
      description: "Quel est le membre ?",
      required: true,
      autocomplete: false
    },
    {
      name: "texte",
      type: "string",
      description: "Quel est le sujet ?",
      required: true,
      autocomplete: false
    }
  ],

  async run(bot, interaction) {

    let user = await interaction.options.getUser("membre");
    let reason = interaction.options.getString("texte")

    try {

      try {

        await interaction.deferReply({ ephemeral: true })

        let Embed = new Discord.EmbedBuilder()
          .setColor("#FF5D00")
          .setTitle(`Chargement de la commande dm !!`)
          .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
          .setDescription(`${textE} **__Je suis entrain d'écrire le message__** ${textE}

                > **Sur le serveur :** ${interaction.guild.name}, 
                
                \`veuillez patienter\`.`)
          .setTimestamp()
          .setFooter({ text: "dm" })
        await interaction.followUp({ embeds: [Embed] }).then(() => {

          let embed2 = new Discord.EmbedBuilder()

            .setColor("#00A705")
            .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
            .setDescription(`${textE} **__J'ai bien envoyer un message privé__**
                    
                    > **Membre :** \`${user.tag}\``)
            .setTimestamp()
            .setFooter({ text: "dm" })
          setTimeout(async () => await interaction.editReply({ embeds: [embed2] }), 500)
        })

        let Embed1 = new Discord.EmbedBuilder()
          .setColor("#00A705")
          .setTitle(`Message de ${user.tag}`)
          .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
          .setDescription(`> ${textE}**Message :** ${reason}`)
          .setTimestamp()
          .setFooter({ text: "Message en mp." })
        await user.send({ embeds: [Embed1] })

      } catch (err) { }

    } catch (err) {
      console.log(`
      >------------ OUPS UNE ERREUR ------------<
      
      UNE ERREUR DANS LA COMMANDE DM !!

      >--------------- L'ERREUR ----------------<

      ${err}
      
      >-----------------------------------------<
      `)
      fs.writeFile("./erreur.txt", `${err.stack}`, () => { return })
      let channel = await bot.channels.cache.get("1041816985920610354")
      channel.send({ content: `⚠️ UNE ERREUR DANS LA COMMANDE DM !!`, files: [{ attachment: './erreur.txt', name: 'erreur.txt', description: "L'erreur obtenue" }] })
    }
  }
}