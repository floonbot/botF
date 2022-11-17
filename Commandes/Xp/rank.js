const Discord = require("discord.js");
const Canvas = require("discord-canvas-easy");
const fs = require("fs");

module.exports = {

  name: 'rank',
  description: "Donne l'xp d'un membre",
  permission: "Aucune",
  dm: false,
  category: "💹Experience",
  options: [
    {
      type: "user",
      name: "utilisateur",
      description: "Quel est le membre ?",
      required: false,
      autocomplete: false
    }
  ],

  async run(bot, message, args, db) {

    let user;
    if (args.getUser("utilisateur")) {
      user = args.getUser("utilisateur")
      if (!user || !message.guild.members.cache.get(user?.id)) return message.reply({ content: "Pas de membre !!", ephemeral: true })
    } else user = message.user;

    try {

      db.query(`SELECT * FROM xp WHERE guildId = '${message.guildId}' AND userId = '${user.id}'`, async (err, req) => {

        db.query(`SELECT * FROM xp WHERE guildId = '${message.guildId}'`, async (err, all) => {

          if (req.length < 1) return message.reply({ content: `\`${message.user.tag}\` la personne que tu as regarder l'xp ,n'a pas encore envoyer de message sur le serveur !!`, ephemeral: true })

          await message.deferReply()

          const calculXp = (xp, level) => {
            let xptotal = 0;
            for (let i = 0; i < level + 1; i++) xptotal += i * 1000
            xptotal += xp;
            return xptotal
          }

          let leaderboard = await all.sort((a, b) => calculXp(parseInt(b.xp), parseInt(b.level)) - calculXp(parseInt(a.xp), parseInt(a.level)))
          let xp = parseInt(req[0].xp)
          let level = parseInt(req[0].level)
          let rank = leaderboard.findIndex(r => r.userId === user.id) + 1
          let need = (level + 1) * 1000;

          let Card = await new Canvas.Card()
            //mettre ton image
            .setBackground("./assets/background/xp.png")
            .setBot(bot)
            .setColorFont("#ffffff")
            .setRank(rank)
            .setUser(user)
            .setColorProgressBar("#8A2BE2")
            .setGuild(message.guild)
            .setXp(xp)
            .setLevel(level)
            .setXpNeed(need)
            .toCard()
          await message.editReply({ files: [new Discord.AttachmentBuilder(Card.toBuffer(), { name: "rank.png" })] })
        })
      })

    } catch (err) {
      console.log(`
      >------------ OUPS UNE ERREUR ------------<
      
      UNE ERREUR DANS LA COMMANDE RANK !!

      >--------------- L'ERREUR ----------------<

      ${err}
      
      >-----------------------------------------<
      `)
      fs.writeFile("./erreur.txt", `${err.stack}`, () => { return })
      let channel = await bot.channels.cache.get("1041816985920610354")
      channel.send({ content: `⚠️ UNE ERREUR DANS LA COMMANDE RANK !!`, files: [{ attachment: './erreur.txt', name: 'erreur.txt', description: "L'erreur obtenue" }] })
    }
  }
}
