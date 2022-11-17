const Discord = require("discord.js");
const Canvas = require("discord-canvas-easy");
const fs = require("fs");

module.exports = {

  name: "leaderboard",
  description: "Envoie le top 10 des membres avec le plus d'xp",
  permission: "Aucune",
  dm: false,
  category: "💹Experience",


  async run(bot, message, args, db) {

    db.query(`SELECT * FROM xp WHERE guildId = '${message.guildId}'`, async (err, req) => {

      try {

        if (req.length < 1) return message.reply({ content: "Personne n'a de l'xp !!", ephemeral: true })

        await message.deferReply()

        const calculXp = (xp, level) => {
          let xptotal = 0;
          for (let i = 0; i < level + 1; i++) xptotal += i * 1000
          xptotal += xp;
          return xptotal
        }

        let leaderboard = await req.sort((a, b) => calculXp(parseInt(b.xp), parseInt(b.level)) - calculXp(parseInt(a.xp), parseInt(a.level)))

        const Leaderboard = await new Canvas.Leaderboard()
          .setBot(bot)
          .setGuild(message.guild)
          .setBackground("./assets/background/xp.png")
          .setColorFont("#3dffcc")

        for (let i = 0; i < (req.length > 10 ? 10 : req.length); i++) {

          await Leaderboard.addUser(await bot.users.fetch(leaderboard[i].userId), parseInt(leaderboard[i].level), parseInt(leaderboard[i].xp), (parseInt(leaderboard[i].level) + 1) * 1000)
        }

        const Image = await Leaderboard.toLeaderboard()

        await message.followUp({ files: [new Discord.AttachmentBuilder(Image.toBuffer(), { name: "leaderboard.png" })] })

      } catch (err) {
        console.log(`
        >------------ OUPS UNE ERREUR ------------<
        
        UNE ERREUR DANS LA COMMANDE LEADERBOARD !!
  
        >--------------- L'ERREUR ----------------<

        ${err}
        
        >-----------------------------------------<
        `)
        fs.writeFile("./erreur.txt", `${err.stack}`, () => { return })
        let channel = await bot.channels.cache.get("1041816985920610354")
        channel.send({ content: `⚠️ UNE ERREUR DANS LA COMMANDE LEADERBOARD !!`, files: [{ attachment: './erreur.txt', name: 'erreur.txt', description: "L'erreur obtenue" }] })
      }
    })
  }
} 