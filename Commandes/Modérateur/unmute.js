const Discord = require("discord.js");
const fs = require("fs");
const { serveurE, muteE, modoE, userE, textE } = require("../.././json/emoji.json");

module.exports = {

  name: "unmute",
  description: "Permet d'enlever le mute d'un membre",
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
      description: "Quel est la raison ?",
      required: true,
      autocomplete: false
    }
  ],
  async run(bot, message, args) {

    let user = args.getUser("membre");
    if (!user) return message.reply({ content: "Pas de membre à unmute !!", ephemeral: true })
    let member = message.guild.members.cache.get(user.id)
    if (!member) return message.reply({ content: "Pas de membre !!", ephemeral: true })

    let reason = args.getString("raison")
    if (!reason) reason = "Pas de raison fournie !";

    if (!member.moderatable) return message.reply({ content: "Je ne peux pas unmute ce membre !!", ephemeral: true })
    if (message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply("Tu ne peux pas umute cette personne")
    if (!member.isCommunicationDisabled()) return message.reply({ content: "Ce membre est pas mute !!", ephemeral: true })

    try {

      try {

        let unMuteEmbed = new Discord.EmbedBuilder()
          .setColor("#FF0000")
          .setTitle(`Unmute par ${message.user.tag}`)
          .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
          .setDescription(`${muteE} **__Unmute__**
                
                > ${serveurE} **Serveur :**\`${message.guild.name}\`
                > ${modoE} **Modérateur :**\`${message.user.tag}\`\n 
                > ${textE} **Raison :** \`${reason}\``)
          .setTimestamp()
          .setFooter({ text: "Unmute" })
        await user.send({ embeds: [unMuteEmbed] })

      } catch (err) { return }

      await message.deferReply()

      let Embed = new Discord.EmbedBuilder()
        .setColor("#FF5D00")
        .setTitle(`Chargement de la commande unmute !!`)
        .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
        .setDescription(`${muteE}**__Je suis entrain de unmute le membre__**${muteE}

            > **Sur le serveur :** ${message.guild.name}, 
            
            \`veuillez patienter\`.`)
        .setTimestamp()
        .setFooter({ text: "unmute" })
      await message.followUp({ embeds: [Embed] }).then(() => {

        let unMuteEmbed = new Discord.EmbedBuilder()
          .setColor("#FF0000")
          .setTitle(`Le membre a étais Unmute`)
          .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
          .setDescription(`${muteE} **__Unmute__** 

            > ${modoE} **Modérateur :**\`${message.user.tag}\`
            > ${userE} **Membre :** \`${user.tag}\` 
            > ${textE} **Raison :** \`${reason}\``)
          .setTimestamp()
          .setFooter({ text: "Unmute" })
        setTimeout(async () => await message.editReply({ embeds: [unMuteEmbed] }), 2000)
      })
      await member.timeout(null, reason)

    } catch (err) {
      console.log(`
      >------------ OUPS UNE ERREUR ------------<
      
      UNE ERREUR DANS LA COMMANDE UNMUTE !!

      >--------------- L'ERREUR ----------------<

      ${err}
      
      >-----------------------------------------<
      `)
      fs.writeFile("./erreur.txt", `${err.stack}`, () => { return })
      let channel = await bot.channels.cache.get("1041816985920610354")
      channel.send({ content: `⚠️ UNE ERREUR DANS LA COMMANDE UNMUTE !!`, files: [{ attachment: './erreur.txt', name: 'erreur.txt', description: "L'erreur obtenue" }] })
    }
  }
}
