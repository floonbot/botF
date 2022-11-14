const Discord = require("discord.js");
const fs = require("fs");
const Canvasez = require("discord-canvas-easy");

module.exports = async (bot, member) => {

  let db = bot.db;

  try {
    db.query(`SELECT * FROM goodbyes WHERE guildId = '${member.guild.id}'`, async (err, req) => {

      if (req.length < 1 || Boolean(req[0].goodbye) === false) return;

      let channel = bot.channels.cache.get(req[0].goodbye)
      if (!channel) return;

      const Goodbye = await new Canvasez.Home()
        .setBackground("./assets/background/goodbye.png")
        .setGuild(member.guild)
        .setUser(member.user)
        .setColorFont("#4B006E")
        .setText(`a quitté le serveur ${member.guild.name}`)
        .toHome()

      await channel.send({ files: [new Discord.AttachmentBuilder(Goodbye.toBuffer(), { name: "goodbye.png" })] })

    })

  } catch (err) {

    console.log("Une erreur dans l'event guildMemberRemove pour la création du création du goodbye.", err)

    fs.writeFile("./erreur.txt", `${err.stack}`, () => {
      return
    })

    let channel = await bot.channels.cache.get("1041816985920610354")
    channel.send({ content: `⚠️ Une erreur est apparue ! Sur le  ${message.guild.name} !`, files: [{ attachment: './erreur.txt', name: 'erreur.txt', description: "L'erreur obtenue" }] })
  }
}