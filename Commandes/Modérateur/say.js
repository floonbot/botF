const Discord = require("discord.js");
const fs = require("fs");

module.exports = {
  name: "say",
  description: "Envoyer un message sous l'identiter du bot",
  permission: Discord.PermissionFlagsBits.ModerateMembers,
  dm: false,
  category: "🧑🏻‍⚖️Modération",
  options: [
    {
      type: "string",
      name: "message",
      description: "Quel est le message ?",
      required: true,
      autocomplete: false
    }
  ],

  async run(message, args) {

    try {

      const msg = args.getString("message");
      message.reply(msg);

    } catch (err) {

      console.log(`Une erreur sur la commande say`, err)

      fs.writeFile("./erreur.txt", `${err.stack} `, () => {
        return
      })

      let channel = await bot.channels.cache.get("1041816985920610354")
      channel.send({ content: `⚠️ Une erreur est apparue! Sur le  ${message.guild.name} !`, files: [{ attachment: './erreur.txt', name: 'erreur.txt', description: "L'erreur obtenue" }] })
    }
  }
}