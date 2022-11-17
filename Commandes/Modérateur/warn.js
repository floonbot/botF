const Discord = require("discord.js");
const fs = require("fs");
const { modoE, serveurE, warnE, textE } = require("../.././json/emoji.json");

module.exports = {

  name: "warn",
  description: "Pour warn un membre sur le serveur",
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

    }, {
      type: "string",
      name: "raison",
      description: "Quel est le raison ?",
      required: true,
      autocomplete: false

    }
  ],

  async run(bot, message, args, db) {

    let user = args.getUser("membre")
    if (!user) return message.reply({ content: "Le membre n'a pas été trouvé !!", ephemeral: true })
    let member = message.guild.members.cache.get(user.id)
    if (!member) return message.reply({ content: "Le membre n'a pas été trouvé !!", ephemeral: true })
    let reason = args.getString("raison")
    if (!reason) reason = "Veuillez noter la raison du warn.";

    if (message.user.id === user.id) message.reply({ content: "Tu ne peux pas te warn toi-même !!", ephemeral: true })
    if ((await message.guild.fetchOwner()).id === user.id) return message.reply({ content: "Tu ne peux pas warn le propriétaire du serveur !!", ephemeral: true })
    if (member && message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply({ content: "Tu ne peux pas warn ce membre !!", ephemeral: true })
    if ((await message.guild.members.fetchMe()).roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply({ content: "Tu ne peux pas warn ce membre !!", ephemeral: true })

    try {

      try {

        let warnEmbed = new Discord.EmbedBuilder()
          .setColor("#FF0000")
          .setTitle(`Warn par ${message.user.tag}`)
          .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
          .setDescription(`${warnE} **__Avertissement__**
                
                > ${serveurE} **Serveur :** \`${message.guild.name}$\`
                > ${modoE} **Modérateur :** \`${message.user.tag}\` 
                > ${textE} **Raison ** : \`${reason}\`!`)
          .setTimestamp()
          .setFooter({ text: "Warn" })
        await user.send({ embeds: [warnEmbed] })

      } catch (err) { return }

      await message.deferReply()

      let Embed = new Discord.EmbedBuilder()
        .setColor("#FF5D00")
        .setTitle(`Chargement de la commande warn !!`)
        .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
        .setDescription(`${warnE}**__Je warn le membre__**${warnE}

            > **Sur le serveur :** ${message.guild.name}, 
            
            \`veuillez patienter\`.`)
        .setTimestamp()
        .setFooter({ text: "warn" })
      await message.followUp({ embeds: [Embed] }).then(() => {

        let warnEmbed = new Discord.EmbedBuilder()
          .setColor("#FF0000")
          .setTitle(`le membre a étais warn`)
          .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
          .setDescription(`${warnE} **__Avertissement__** \
            
            > ${modoE} **Modérateur :** \`${message.user.tag}\`
            > ${textE} **Raison :** \`${reason}\``)
          .setTimestamp()
          .setFooter({ text: "Warn" })
        setTimeout(async () => await message.editReply({ embeds: [warnEmbed] }), 2000)
      })

      let ID = await bot.fonction.createId("WARN")
      db.query(`INSERT INTO warns (guild, guildId, user, userId, author, authorId, warn, reason, date) VALUES ('${message.guild.name}', '${message.guild.id}','${user.tag}', '${user.id}','${message.user.tag}','${message.user.id}', '${ID}', '${reason.replace(/'/g, "\\'")}', '${Date.now()}')`)

    } catch (err) {
      console.log(`
      >------------ OUPS UNE ERREUR ------------<
      
      UNE ERREUR DANS LA COMMANDE WARN !!

      >--------------- L'ERREUR ----------------<

      ${err}
      
      >-----------------------------------------<
      `)
      fs.writeFile("./erreur.txt", `${err.stack}`, () => { return })
      let channel = await bot.channels.cache.get("1041816985920610354")
      channel.send({ content: `⚠️ UNE ERREUR DANS LA COMMANDE WARN !!`, files: [{ attachment: './erreur.txt', name: 'erreur.txt', description: "L'erreur obtenue" }] })
    }
  }
} 