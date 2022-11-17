const Discord = require("discord.js");
const fs = require("fs");
const { kickE, serveurE, userE, modoE, textE } = require("../.././json/emoji.json");

module.exports = {

  name: "kick",
  description: "Pour kick un membre qui à fait une infractions",
  permission: Discord.PermissionFlagsBits.ModerateMembers,
  category: "🧑🏻‍⚖️Modération",
  dm: false,
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
      description: "Quel est la raison ?",
      required: true,
      autocomplete: false
    }
  ],
  async run(bot, message, args, db) {

    let user = args.getUser("membre")
    if (!user) return message.reply({ content: "Pas de membre à kick !!", ephemeral: true })
    let member = message.guild.members.cache.get(user.id)
    if (!member) return message.reply({ content: "Pas de membre à kick !!", ephemeral: true })

    let reason = args.get("raison").value;
    if (!reason) reason = "Pas de raison fournie pour kick le membre !!";

    if (message.user.id === user.id) return message.reply({ content: "Essaie pas de te kick !!", ephemeral: true })
    if ((await message.guild.fetchOwner()).id === user.id) return message.reply({ content: "Ne kick pas le propriétaire du serveur !!", ephemeral: true })
    if (member && !member.kickable) return message.reply({ content: "Je ne peux pas kick ce membre !!", ephemeral: true })
    if (member && message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply({ content: "Tu ne peux pas kick cette personne !!", ephemeral: true })

    try {

      let kickEmbed = new Discord.EmbedBuilder()
        .setColor("#FF0000")
        .setTitle(`Kick par ${message.user.tag}`)
        .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
        .setDescription(`${kickE} **__Kick__**
        
         > ${serveurE} **Serveur :** \`${message.guild.name}\`
         > ${modoE} **Modérateur :** \`${message.user.tag}\`
         > ${textE} **Raison :** \`${reason}\`!`)
        .setTimestamp()
        .setFooter({ text: "Kick" })
      await user.send({ embeds: [kickEmbed] })

    } catch (err) { return }

    try {

      await message.deferReply()

      let Embed = new Discord.EmbedBuilder()
        .setColor("#FF5D00")
        .setTitle(`Chargement de la commande kick !!`)
        .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
        .setDescription(`${kickE}**__Je suis entrain de kick le membre__**${kickE}

                > **Sur le serveur :** ${message.guild.name}, 
                
                \`veuillez patienter\`.`)
        .setTimestamp()
        .setFooter({ text: "kick" })
      await message.followUp({ embeds: [Embed] }).then(() => {

        let kickEmbed = new Discord.EmbedBuilder()
          .setColor("#FF0000")
          .setTitle(`Le membre a étais kick`)
          .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
          .setDescription(`${kickE} **__kick__**
        
        > ${modoE} **Modérateur :** \`${message.user.tag}\`
        > ${userE} **Membre qui est kick :** \`${user.tag}\`
        > ${textE} **Raison :** \`${reason}\`!`)
          .setTimestamp()
          .setFooter({ text: "kick" })
        setTimeout(async () => await message.editReply({ embeds: [kickEmbed] }), 2000)
      })
      await member.kick(reason)

    } catch (err) {
      console.log(`
      >------------ OUPS UNE ERREUR ------------<
      
      UNE ERREUR DANS LA COMMANDE KICK !!

      >--------------- L'ERREUR ----------------<

      ${err}
      
      >-----------------------------------------<
      `)
      fs.writeFile("./erreur.txt", `${err.stack}`, () => { return })
      let channel = await bot.channels.cache.get("1041816985920610354")
      channel.send({ content: `⚠️ UNE ERREUR DANS LA COMMANDE KICK !!`, files: [{ attachment: './erreur.txt', name: 'erreur.txt', description: "L'erreur obtenue" }] })
    }

    let ID = await bot.fonction.createId("KICK")

    db.query(`INSERT INTO kicks (guild, guildId, user, userId, author, authorId, kick, reason, date) VALUES ('${message.guild.name}', '${message.guild.id}','${user.tag}', '${user.id}','${message.user.tag}','${message.user.id}', '${ID}', '${reason.replace(/'/g, "\\'")}', '${Date.now()}')`)

  }
}