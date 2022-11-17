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
      console.log(`
      >------------ OUPS UNE ERREUR ------------<
      
      UNE ERREUR DANS LA COMMANDE SAY !!

      >--------------- L'ERREUR ----------------<

      ${err}
      
      >-----------------------------------------<
      `)
      fs.writeFile("./erreur.txt", `${err.stack}`, () => { return })
      let channel = await bot.channels.cache.get("1041816985920610354")
      channel.send({ content: `⚠️ UNE ERREUR DANS LA COMMANDE SAY !!`, files: [{ attachment: './erreur.txt', name: 'erreur.txt', description: "L'erreur obtenue" }] })
    }
  }
}