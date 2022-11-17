const { ButtonBuilder, ButtonStyle } = require('discord.js');
const Discord = require("discord.js");
const fs = require("fs");

module.exports = {
  name: "ticket",
  description: "envoi l'embed des ticket",
  permission: Discord.PermissionFlagsBits.ManageChannels,
  dm: false,
  category: "🧑🏻‍⚖️Modération",

  async run(bot, message, args) {

    try {
      const Ticketembed = new Discord.EmbedBuilder()
        .setTitle(`Ticket`)
        .setDescription(`Merci de respecter les regles concernant les tickets !\n1-Ne pas creer de ticket sans raison\n\n2-ne pas mentionner le staff sauf si vous n'avez pas eu de reponse pendant 24h\n\n3-Ne pas creer de ticket troll ou pour insulter le staff ou une autre personne\nCordialment l'equipe ${message.guild.name}`)
        .setThumbnail(message.guild.iconURL())
        .setFooter({ text: `Cordialment l'equipe ${message.guild.name}`, iconURL: message.guild.iconURL() })

      const tb = new Discord.ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
            .setCustomId('primary')
            .setLabel('Creer un ticket')
            .setStyle(ButtonStyle.Success)
        );

      message.reply({ content: `L'embed des tickets a été envoyer dans ${message.channel}`, ephemeral: true }),
        message.channel.send({ embeds: [Ticketembed], components: [tb] })

    } catch (err) {
      console.log(`
      >------------ OUPS UNE ERREUR ------------<
      
      UNE ERREUR DANS LA COMMANDE TICKET !!

      >--------------- L'ERREUR ----------------<

      ${err}
      
      >-----------------------------------------<
      `)
      fs.writeFile("./erreur.txt", `${err.stack}`, () => { return })
      let channel = await bot.channels.cache.get("1041816985920610354")
      channel.send({ content: `⚠️ UNE ERREUR DANS LA COMMANDE TICKET !!`, files: [{ attachment: './erreur.txt', name: 'erreur.txt', description: "L'erreur obtenue" }] })
    }
  }
}