const Discord = require("discord.js");
const fs = require("fs");

module.exports = {

  name: "nuke",
  description: "Recréer un salon",
  permission: Discord.PermissionFlagsBits.ModerateMembers,
  dm: false,
  category: "🧑🏻‍⚖️Modération",
  options: [
    {
      type: "channel",
      name: "channel",
      description: "Quel est le salon ?",
      required: true,
      autocomplete: false
    }

  ],

  async run(message) {

    try {
      const channel = message.options.getChannel("channel");

      channel.clone({ position: channel.position.rawPosition }).then(async ch => {
        ch.send({ content: `Le salon a bien été recréer !!` }).then((msg) => {
          setTimeout(() => msg.delete(), 10000)
        })
        await message.reply({ content: `J'ai bien recréer le salon ${ch}. Veuillez patienter pour la suppréssion du salon !!` }).then((ch) => {
          setTimeout(() => channel.delete(), 10000)
        })
      })

    } catch (err) {

      console.log("Une erreur dans le commande nuke", err)

      fs.writeFile("./erreur.txt", `${err.stack} `, () => {
        return
      })

      let channel = await bot.channels.cache.get("1038859689833791528")
      channel.send({ content: `⚠️ Une erreur est apparue! Sur le  ${message.guild.name} !`, files: [{ attachment: './erreur.txt', name: 'erreur.txt', description: "L'erreur obtenue" }] })
    }
  }
}