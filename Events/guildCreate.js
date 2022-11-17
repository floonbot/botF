const fs = require('fs');
module.exports = async (bot, guild,) => {

  try {

    let db = bot.db;

    db.query(`SELECT * FROM server WHERE guild = '${guild.id}'`, async (err, req) => {

      if (req.length < 1) {

        db.query(`INSERT INTO server (guild, captcha, logs, antiraid) VALUES (${guild.id},'false','false','false')`)

      }
    })

  } catch (err) {
    console.log(`
    >------------ OUPS UNE ERREUR ------------<
    
    UNE ERREUR DANS L'EVENT GUILDCREATE !!

    >--------------- L'ERREUR ----------------<

    ${err}
    
    >-----------------------------------------<
    `)
    fs.writeFile("./erreur.txt", `${err.stack}`, () => { return })
    let channel = await bot.channels.cache.get("1041816985920610354")
    channel.send({ content: `⚠️ UNE ERREUR DANS L'EVENT GUILDCREATE !!`, files: [{ attachment: './erreur.txt', name: 'erreur.txt', description: "L'erreur obtenue" }] })
  }
}
