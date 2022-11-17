const fs = require("fs");
const { huitball, vraisfaux, } = require("../.././json/emoji.json");
const { EmbedBuilder } = require("discord.js");

module.exports = {

  name: "8ball",
  description: "Pose une question et il te dira la vérité",
  permission: "Aucune",
  dm: false,
  category: "🥳Fun",
  options: [
    {
      type: "string",
      name: "question",
      description: "Quel est la question ?",
      required: true,
      autocomplete: false
    }
  ],

  async run(bot, message, args) {

    await message.deferReply()

    try {

      let quest = args.getString("question")
      let result = ["Oui", "Non", "Peut-être"][Math.floor(Math.random() * ["Oui", "Non", "Peut-être"].length)];

      const cEmbed = new EmbedBuilder()
        .setColor("#FF5D00")
        .setTitle(`Chargement de la commande 8ball !!`)
        .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
        .setDescription(`${huitball} **__Je cherche la réponse à la question__** ${huitball}

            > **Sur le serveur :** ${message.guild.name}
             
              \`Veuillez patienter\``)
        .setTimestamp()
        .setFooter({ text: `8 ball` })
      return message.followUp({ embeds: [cEmbed] }).then(() => {

        const ballEmbed = new EmbedBuilder()
          .setTitle(`La réponse à la question de ${message.user.tag}`)
          .setColor("#00A705")
          .addFields(
            { name: `${huitball} Question`, value: `> ${quest}`, inline: false },
            { name: `${vraisfaux} Reponse`, value: `> ${result}`, inline: false },
          )
          .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
          .setTimestamp()
          .setFooter({ text: "8 ball" })
        setTimeout(async () => message.editReply({ embeds: [ballEmbed] }), 1500)
      })

    } catch (err) {
      console.log(`
      >------------ OUPS UNE ERREUR ------------<
      
      UNE ERREUR DANS LA COMMANDE 8BALL !!

      >--------------- L'ERREUR ----------------<

      ${err}
      
      >-----------------------------------------<
      `)
      fs.writeFile("./erreur.txt", `${err.stack}`, () => { return })
      let channel = await bot.channels.cache.get("1041816985920610354")
      channel.send({ content: `⚠️ UNE ERREUR DANS LA COMMANDE 8BALL !!`, files: [{ attachment: './erreur.txt', name: 'erreur.txt', description: "L'erreur obtenue" }] })
    }
  }
}