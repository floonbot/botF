const Discord = require("discord.js")
const fs = require("fs");

module.exports = {

  name: "clear",
  description: "Efface beaucoup de messages",
  permission: Discord.PermissionFlagsBits.ModerateMembers,
  dm: false,
  category: "🧑🏻‍⚖️Modération",
  options: [
    {
      type: "number",
      name: "nombre",
      description: "Quel est le nombre ?",
      required: true,
      autocomplete: false
    }, {
      type: "channel",
      name: "salon",
      description: "Quel est le salon ?",
      required: false,
      autocomplete: false
    }
  ],

  async run(bot, message, args) {

    let channel = args.getChannel("salon")
    if (!channel) channel = message.channel;
    if (channel.id !== message.channel.id && !message.guild.channels.cache.get(channel.id)) return message.reply({ content: "Pas de salon !!", ephemeral: true })

    let number = args.getNumber("nombre")
    if (parseInt(number) <= 0 || parseInt(number) > 100) return message.reply({ content: "Il nous faut un nombre entre `0` et `100` inclus !!", ephemeral: true })

    try {

      try {

        let messages = await channel.bulkDelete(parseInt(number))
        await message.reply({ content: `J'ai bien supprimé \`${messages.size}\` message(s) dans le salon ${channel} !!`, ephemeral: true })

      } catch (err) {

        let messages = [...(await channel.messages.fetch()).values()].filter(async m => (Date.now() - m.createdAt) <= 1209600000)
        if (!messages.length <= 0) message.reply({ content: "Aucun message à supprimer car ils datent tous de plus de 14 jours !!", ephemeral: true })
        await channel.bulkDelete(messages)
        await message.reply({ content: `J'ai pu supprimé uniquement \`${messages.size}\` message(s) dans le salon ${channel} car les autres dataient de plus 14 jours !!`, ephemeral: true })

      }

    } catch (err) {
      console.log(`
      >------------ OUPS UNE ERREUR ------------<
      
      UNE ERREUR DANS LA COMMANDE CLEAR !!

      >--------------- L'ERREUR ----------------<

      ${err}
      
      >-----------------------------------------<
      `)
      fs.writeFile("./erreur.txt", `${err.stack}`, () => { return })
      let channel = await bot.channels.cache.get("1041816985920610354")
      channel.send({ content: `⚠️ UNE ERREUR DANS LA COMMANDE CLEAR !!`, files: [{ attachment: './erreur.txt', name: 'erreur.txt', description: "L'erreur obtenue" }] })
    }
  }
}