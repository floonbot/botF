const Discord = require('discord.js');
const fs = require("fs");
const { avatar } = require("../.././json/emoji.json");
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {

  name: "avatar",
  description: "Permet de récupérer l'avatar d'un membre",
  permission: "Aucune",
  dm: false,
  category: "🥳Fun",
  options: [
    {
      type: "user",
      name: "utlisateur",
      description: "Quel est l'avatar ?",
      required: true,
      autocomplete: false
    }
  ],

  async run(bot, message, args) {

    try {

      let user = args.getUser(`utlisateur`)
      if (!user) return message.reply({ content: "Utlisateur non valide ou mal définie !!", ephemeral: true })

      await message.deferReply()

      let row = new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
            .setLabel(`Avatar`)
            .setURL(`${user.displayAvatarURL({ dynamic: true })}`)
            .setStyle(ButtonStyle.Link)
        )

      let avatarEmbed = new Discord.EmbedBuilder()
        .setColor("#FF5D00")
        .setTitle(`Chargement de la commande avatar !!`)
        .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
        .setDescription(`${avatar} **__Je cherche l'avatar du membre__** ${avatar}
                
                > **Sur le serveur :** ${message.guild.name}

                \`Veuillez patienter\``)
        .setTimestamp()
        .setFooter({ text: "Avatar" })
      await message.followUp({ embeds: [avatarEmbed] }).then(() => {

        avatarEmbed = new EmbedBuilder()
          .setColor("#00A705")
          .setDescription(`> ${avatar} **__L'avatar du membre ${user.tag}__**`)
          .setImage(user.displayAvatarURL({ dynamic: true }))
        setTimeout(() => message.editReply({ embeds: [avatarEmbed], components: [row] }), 2000);
      })

    } catch (err) {
      console.log(`
      >------------ OUPS UNE ERREUR ------------<
      
      UNE ERREUR DANS LA COMMANDE AVATAR !!

      >--------------- L'ERREUR ----------------<

      ${err}
      
      >-----------------------------------------<
      `)
      fs.writeFile("./erreur.txt", `${err.stack}`, () => { return })
      let channel = await bot.channels.cache.get("1041816985920610354")
      channel.send({ content: `⚠️ UNE ERREUR SUR LA COMMANDE AVATAR !!`, files: [{ attachment: './erreur.txt', name: 'erreur.txt', description: "L'erreur obtenue" }] })
    }
  }
}