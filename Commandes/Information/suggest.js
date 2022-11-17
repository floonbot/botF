const fs = require("fs");
const { EmbedBuilder } = require("discord.js");
const { idée } = require("../.././json/emoji.json")

module.exports = {

  name: "suggest",
  description: "Permet d'envoyer une suggestion",
  permission: "Aucune",
  dm: false,
  category: "👆🏻Information",
  options: [
    {
      type: "string",
      name: "texte",
      description: "Quel est la suggestion ?",
      required: true,
      autocomplete: false
    }
  ],

  async run(bot, message, args, db) {

    try {

      db.query(`SELECT * FROM suggests WHERE guildId = '${message.guild.id}'`, async (err, req) => {

        if (req.length < 1 || Boolean(req[0].suggest) === false) return

        let channel = bot.channels.cache.get(req[0].suggest)
        if (!channel) { return message.reply({ content: "Pas de salon pour la suggestion fait un /setsuggest !! ", ephemeral: true }) };

        let msg = args.getString("texte");

        message.reply({ content: "La suggestion est bien envoyer !!", ephemeral: true })

        const EmbedMessage = new EmbedBuilder()

          .setTitle(`Nouvelle suggestion!`)
          .setColor("#0070FF")
          .setThumbnail(message.user.displayAvatarURL({ dynamic: true, size: 64 }))
          .setDescription(`${idée} **__Suggestion__**

                    > ${message.user} : ${msg}`)
          .setTimestamp()
          .setFooter({ text: "suggest" })

        channel.send({ embeds: [EmbedMessage] }).then(function (message) {
          message.react("✅")
          message.react("❌")
        });
      })

    } catch (err) {
      console.log(`
      >------------ OUPS UNE ERREUR ------------<
      
      UNE ERREUR DANS LA COMMANDE SUGGEST !!

      >--------------- L'ERREUR ----------------<

      ${err}
      
      >-----------------------------------------<
      `)
      fs.writeFile("./erreur.txt", `${err.stack}`, () => { return })
      let channel = await bot.channels.cache.get("1041816985920610354")
      channel.send({ content: `⚠️ UNE ERREUR DANS LA COMMANDE SUGGEST !!`, files: [{ attachment: './erreur.txt', name: 'erreur.txt', description: "L'erreur obtenue" }] })
    }
  }
}