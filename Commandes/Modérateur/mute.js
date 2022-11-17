const Discord = require("discord.js")
const fs = require("fs");
const ms = require("ms");
const { muteE, serveurE, userE, modoE, textE, TimeE } = require("../.././json/emoji.json");

module.exports = {

  name: "mute",
  description: "Permet de mute un membre sur le serveur",
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
      name: "temps",
      description: "Quel est le temps ?",
      required: true,
      autocomplete: false
    }, {
      type: "string",
      name: "raison",
      description: "Quel est la raison ?",
      required: true,
      autocomplete: false
    }
  ],
  async run(bot, message, args, db) {


    let user = args.getUser("membre");
    if (!user) return message.reply({ content: "Pas de membre à mute !!", ephemeral: true })
    let member = message.guild.members.cache.get(user.id)
    if (!member) return message.reply({ content: "Pas de membre !!", ephemeral: true })

    let time = args.getString("temps")
    if (!time) return message.reply({ content: "Pas de temps !!", ephemeral: true })
    if (isNaN(ms(time))) return message.reply({ content: "Pas le bon format !!", ephemeral: true })
    if (ms(time) > 2419200000) return message.reply({ content: "Le mute ne peux pas dures plus de 28 jours !!", ephemeral: true })

    let reason = args.getString("raison")
    if (!reason) reason = "Pas de raison fournie !!";

    if (message.user.id === user.id) return message.reply({ content: "Essaie pas de te mute !!", ephemeral: true })
    if ((await message.guild.fetchOwner()).id === user.id) return message.reply({ content: "Ne mute pas le propriétaire du serveur !!", ephemeral: true })
    if (!member.moderatable) return message.reply("Je ne peux pas mute ce membre !!")
    if (message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply({ content: "Tu ne peux pas mute cette personne !!", ephemeral: true })
    if (member.isCommunicationDisabled()) return message.reply({ content: "Ce membre est déja mute !!", ephemeral: true })

    try {

      try {

        let muteEmbed = new Discord.EmbedBuilder()
          .setColor("#FF0000")
          .setTitle(`Mute par ${message.user.tag}`)
          .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
          .setDescription(`${muteE} **__Mute__** 
                
                > ${serveurE} **Serveur :**\`${message.guild.name}\`
                > ${TimeE} **Time :**\`${time}\`
                > ${modoE} **Modérateur :**\`${message.user.tag}\`
                > ${textE} **Raison :** \`${reason}\`!`)
          .setTimestamp()
          .setFooter({ text: "Mute" })
        await user.send({ embeds: [muteEmbed] })
      } catch (err) { return }
      await message.deferReply()

      let Embed = new Discord.EmbedBuilder()
        .setColor("#FF5D00")
        .setTitle(`Chargement de la commande mute !!`)
        .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
        .setDescription(`${muteE}**__Je suis entrain de kick le membre__**${muteE}

            > **Sur le serveur :** ${message.guild.name}, 
            
            \`veuillez patienter\`.`)
        .setTimestamp()
        .setFooter({ text: "mute" })
      await message.followUp({ embeds: [Embed] }).then(() => {

        let muteEmbed = new Discord.EmbedBuilder()
          .setColor("#FF0000")
          .setTitle(`Le membre a étais mute`)
          .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
          .setDescription(`${muteE} **__Mute__** 

            > ${modoE} **Modérateur :** \`${message.user.tag}\`
            > ${userE} **Membre qui est kick :** \`${user.tag}\`
            > ${TimeE} **Time :**\`${time}\`
            > ${textE} **Raison :** \`${reason}\`!`)
          .setTimestamp()
          .setFooter({ text: "Mute" })
        setTimeout(async () => await message.editReply({ embeds: [muteEmbed] }), 2000)
      })
      await member.timeout(ms(time), reason)

      let ID = await bot.fonction.createId("MUTE")

      db.query(`INSERT INTO mutes (guild, guildId, user, userId, author, authorId, mute, time, reason, date) VALUES ('${message.guild.name}', '${message.guild.id}','${user.tag}', '${user.id}','${message.user.tag}','${message.user.id}', '${ID}', '${time}', '${reason.replace(/'/g, "\\'")}', '${Date.now()}')`)

    } catch (err) {
      console.log(`
      >------------ OUPS UNE ERREUR ------------<
      
      UNE ERREUR DANS LA COMMANDE MUTE !!

      >--------------- L'ERREUR ----------------<

      ${err}
      
      >-----------------------------------------<
      `)
      fs.writeFile("./erreur.txt", `${err.stack}`, () => { return })
      let channel = await bot.channels.cache.get("1041816985920610354")
      channel.send({ content: `⚠️ UNE ERREUR DANS LA COMMANDE MUTE !!`, files: [{ attachment: './erreur.txt', name: 'erreur.txt', description: "L'erreur obtenue" }] })
    }
  }
}
