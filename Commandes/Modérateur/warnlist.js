const Discord = require("discord.js");
const fs = require("fs");
const { warnE } = require("../.././json/emoji.json");

module.exports = {

  name: "warnlist",
  description: "Affiche les warns d'un membre",
  permission: Discord.PermissionFlagsBits.ModerateMembers,
  dm: false,
  category: "🧑🏻‍⚖️Modération",
  options: [
    {
      type: "user",
      name: "membre",
      description: "Quel est le membre ?",
      required: true,
      autocomplete: false
    },
  ],

  async run(bot, message, args, db) {

    let user = args.getUser("membre")
    if (!user) return message.reply({ content: "Pas de membre !!", ephemeral: true })
    let member = message.guild.members.cache.get(user.id)
    if (!member) return message.reply({ content: "pas de membre !!", ephemeral: true })

    try {

      db.query(`SELECT * FROM warns WHERE guildId = '${message.guildId}' AND userId = '${user.id}'`, async (err, req) => {

        if (req.length < 1) return message.reply({ content: "Ce membre n'a pas de warn !!", ephemeral: true })
        await req.sort((a, b) => parseInt(a.date) - parseInt(b.date))

        await message.deferReply()

        let Embed = new Discord.EmbedBuilder()
          .setColor("#FF5D00")
          .setTitle(`Chargement de la commande warnlist !!`)
          .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
          .setDescription(`${warnE}**__Je cherche les warns du membre __**${warnE}
    
                > **Sur le serveur :** ${message.guild.name}, 
                
                \`veuillez patienter\`.`)
          .setTimestamp()
          .setFooter({ text: "warnlist" })
        await message.followUp({ embeds: [Embed] }).then(async () => {

          let Embed = new Discord.EmbedBuilder()
            .setColor("#FF0000")
            .setTitle(`Liste des warns de ${user.tag}`)
            .setThumbnail(user.displayAvatarURL({ dynamic: true, size: 64 }))
            .setTimestamp()
            .setFooter({ text: "warnlist" })

          for (let i = 0; i < req.length; i++) {
            Embed.addFields([{
              name: `Warn n${i + 1}`, value: `> **Auteur** : ${(await bot.users.fetch(req[i].authorId)).tag}\n> **ID** : \`${req[i].warn}\`\n> **Raison** :  \`${req[i].reason}\`\n> **Date** : <t:${Math.floor(parseInt(req[i].date) / 1000)}:F> `
            }])
          }
          setTimeout(async () => await message.editReply({ embeds: [Embed] }), 2000)
        })
      })

    } catch (err) {
      console.log(`
      >------------ OUPS UNE ERREUR ------------<
      
      UNE ERREUR DANS LA COMMANDE WARN-LIST !!

      >--------------- L'ERREUR ----------------<

      ${err}
      
      >-----------------------------------------<
      `)
      fs.writeFile("./erreur.txt", `${err.stack}`, () => { return })
      let channel = await bot.channels.cache.get("1041816985920610354")
      channel.send({ content: `⚠️ UNE ERREUR DANS LA COMMANDE WARN-LIST !!`, files: [{ attachment: './erreur.txt', name: 'erreur.txt', description: "L'erreur obtenue" }] })
    }
  }
}