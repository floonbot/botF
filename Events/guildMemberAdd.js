const Discord = require("discord.js");
const Canvasez = require("discord-canvas-easy");
const fs = require("fs");


module.exports = async (bot, member,) => {

  let db = bot.db;

  try {
    db.query(`SELECT * FROM server WHERE guild = '${member.guild.id}'`, async (err, req) => {

      if (req.length < 1) return;

      if ((req[0].antiraid === "true")) {
        try { await member.user.send("Vous ne pouvez pas rejoindre le serveur car il est en mode antiraid") } catch (err) { }
        await member.kick("Antiraid actif")
      }

      if (req.length < 1 || Boolean(req[0].captcha) === false) return;

      let channel = member.guild.channels.cache.get(req[0].captcha)
      if (!channel) return;

      await channel.permissionOverwrites.create(member.user, {
        SendMessages: true,
        ViewChannel: true,
        ReadMessageHistory: true
      })

      let captcha = await bot.fonction.generateCaptcha()

      let msg = await channel.send({ content: `${member}, Vous avez 2 minutes pour faire le captcha ! Si vous le réussissez pas vous serez exclue du serveur`, files: [new Discord.AttachmentBuilder((await captcha.canvas).toBuffer(), { name: "captcha.png" })] })

      const addRole = member.guild.roles.cache.find(r => r.name === "Non verif")
      if (!addRole) {
        const addRole = await member.guild.roles.create({
          name: 'Non verif', color: "DarkGold"
        });
        await member.roles.add(addRole);
      } else {
        member.roles.add(addRole)
      }

      try {

        let filter = m => m.author.id === member.user.id;
        let response = (await channel.awaitMessages({ filter, max: 1, time: 120000, errors: ["time"] })).first()

        if (response.content === captcha.text) {

          await msg.delete()
          await response.delete()
          try { await member.user.send("Vous avez réussi le captcha") } catch (err) { }
          await channel.permissionOverwrites.delete(member.user.id)
          const removeRole = member.guild.roles.cache.find(r => r.name === "Non verif")
          member.roles.remove(removeRole)

        } else {
          await msg.delete()
          await response.delete()
          try { await member.user.send("Vous avez échoué le captcha!") } catch (err) { }
          await channel.permissionOverwrites.delete(member.user.id)
          await member.kick("A raté  le captcha")
        }

      } catch (err) {

        await msg.delete()
        try { await member.user.send("Vous avez mis trop de temps a fair le captcha") } catch (err) { }
        await channel.permissionOverwrites.delete(member.user.id)
        await member.kick("pas fait le captcha")

      }
    })

  } catch (err) {
    console.log(`
    >------------ OUPS UNE ERREUR ------------<
    
    UNE ERREUR DANS L'EVENT CAPTCHA !!

    >--------------- L'ERREUR ----------------<

    ${err}
    
    >-----------------------------------------<
    `)
    fs.writeFile("./erreur.txt", `${err.stack}`, () => { return })
    let channel = await bot.channels.cache.get("1041816985920610354")
    channel.send({ content: `⚠️ UNE ERREUR DANS L'EVENT CAPTCHA !!`, files: [{ attachment: './erreur.txt', name: 'erreur.txt', description: "L'erreur obtenue" }] })
  }

  try {

    db.query(`SELECT * FROM welcomes WHERE guildId = '${member.guild.id}'`, async (err, req) => {

      if (req.length < 1 || Boolean(req[0].welcome) === false) return;

      let channel = bot.channels.cache.get(req[0].welcome)
      if (!channel) return;

      const Welcome = await new Canvasez.Home()
        //mettre ton image
        .setBackground("./assets/background/welcome.png")
        .setGuild(member.guild)
        .setUser(member.user)
        .setColorFont("#4B006E")
        .setText(`Bienvenue sur le serveur ${member.guild.name}`)
        .toHome()
      await channel.send({ files: [new Discord.AttachmentBuilder(Welcome.toBuffer(), { name: "welcome.png" })] })
    })

  } catch (err) {
    console.log(`
    >------------ OUPS UNE ERREUR ------------<
    
    UNE ERREUR DANS L'EVENT WELCOME !!

    >--------------- L'ERREUR ----------------<

    ${err}
    
    >-----------------------------------------<
    `)
    fs.writeFile("./erreur.txt", `${err.stack}`, () => { return })
    let channel = await bot.channels.cache.get("1041816985920610354")
    channel.send({ content: `⚠️ UNE ERREUR DANS L'EVENT WELCOME !!`, files: [{ attachment: './erreur.txt', name: 'erreur.txt', description: "L'erreur obtenue" }] })
  }
}
