const Discord = require("discord.js");
const fs = require("fs");
const choix = ["\`welcome\`", " \`goodbye\`", " \`captcha\`", " \`logs\`", " \`suggest\`", " \`antiraid\`"];
const { infoE, logE } = require("../.././json/emoji.json");

module.exports = {

  name: "setcommandes",
  description: "Paramètre les commandes sur le serveur",
  permission: Discord.PermissionFlagsBits.ModerateMembers,
  dm: false,
  category: "🗃️Set des commande",
  options: [
    {
      type: "string",
      name: "commande",
      description: "Quel est la commande ?",
      required: true,
      autocomplete: true
    },
    {
      type: "string",
      name: "état",
      description: "Quel est l'état ?",
      required: true,
      autocomplete: true
    },
    {
      type: "channel",
      name: "salon",
      description: "Quel est le salon ",
      required: false,
      autocomplete: false
    }
  ],
  async run(bot, message, args, db,) {

    await message.deferReply()

    let commande = args.getString("commande")
    if (commande !== "antiraid" && commande !== "captcha" && commande !== "goodbye" && commande !== "logs" && commande !== "suggest" && commande !== "welcome") {

      let mauvais = new Discord.EmbedBuilder()
        .setTitle(`**__Les set commandes disponible __**`)
        .setColor("#000000")
        .setDescription(`${infoE} Les choix sont : ${choix}`)
        .setThumbnail(bot.user.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        .setFooter({ text: "setcommande" })
      return await message.followUp({ embeds: [mauvais] })
    }

    let etat = args.getString("état")
    if (etat !== "on" && etat !== "off") {

      let mauvais = new Discord.EmbedBuilder()
        .setTitle(`**__Les set commandes disponible __**`)
        .setColor("#000000")
        .setDescription(`${infoE} Les choix sont : \`off\` et \`on\``)
        .setThumbnail(bot.user.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        .setFooter({ text: "setcommande" })
      return await message.followUp({ embeds: [mauvais] })
    }

    const cEmbed = new Discord.EmbedBuilder()
      .setColor("#FF5D00")
      .setTitle(`Chargement de la commande setcommandes !!`)
      .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
      .setDescription(`${logE} **__Je suis entrain de set la commande__** 

            > **Sur le serveur :** ${message.guild.name}
            
            \`Veuillez patienter\``)
      .setTimestamp()
      .setFooter({ text: "setcommandes" })

    try {

      if (commande === "antiraid") {
        if (etat === "off") {
          db.query(`UPDATE server SET antiraid = 'false' WHERE guild = '${message.guildId}'`)

          return await message.followUp({ embeds: [cEmbed] }).then(() => {

            let Embed = new Discord.EmbedBuilder()
              .setColor("#FFE800")
              .setTitle(`SetAntiRaid`)
              .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
              .setDescription(`Le AntiRaid est bien désactiver`)
              .setTimestamp()
              .setFooter({ text: "SetAntiRaid" })
            setTimeout(async () => await message.editReply({ embeds: [Embed] }), 2000)
          })

        } else {

          db.query(`UPDATE server SET antiraid = 'true' WHERE guild = '${message.guildId}'`)

          return await message.followUp({ embeds: [cEmbed] }).then(() => {

            let Embed = new Discord.EmbedBuilder()
              .setColor("#FFE800")
              .setTitle(`SetAntiRaid`)
              .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
              .setDescription(`Le AntiRaid est bien activé`)
              .setTimestamp()
              .setFooter({ text: "SetAntiRaid" })
            setTimeout(async () => await message.editReply({ embeds: [Embed] }), 2000)
          })
        }
      }

      if (commande === "captcha") {
        if (etat === "off") {
          db.query(`UPDATE server SET captcha = 'false' WHERE guild = '${message.guildId}'`)

          return await message.followUp({ embeds: [cEmbed] }).then(() => {

            let Embed = new Discord.EmbedBuilder()
              .setColor("#FFE800")
              .setTitle(`Setcaptcha`)
              .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
              .setDescription(`Le captcha est bien désactiver \n le rôle \`Non verif\` ne sera plus donner au personne qui rejoint le serveur`)
              .setTimestamp()
              .setFooter({ text: "Setcaptcha" })
            setTimeout(async () => await message.editReply({ embeds: [Embed] }), 2000)
          })

        } else {

          let channel = args.getChannel("salon")
          if (!channel) return message.followUp("Pas de salon Indiqué !!")
          channel = message.guild.channels.cache.get(channel.id)
          if (!channel) return message.followUp("Pas de salon trouvée !!")

          db.query(`UPDATE server SET captcha = '${channel.id}' WHERE guild = '${message.guildId}'`)

          return await message.followUp({ embeds: [cEmbed] }).then(() => {

            let Embed = new Discord.EmbedBuilder()
              .setColor("#FFE800")
              .setTitle(`Setcaptcha`)
              .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
              .setDescription(`Le captcha est bien activé sur le salon ${channel} \n\n 🔺IMPORTANT🔺\n\n \` D'avoir un rôle \` \n\n \`Non verif\` sur le serveur sans aucune permissions ( si pas le de rôle, il sera automatiquemen crée )  !! \n Dans le salon ou se trouve le captcha rajouter comme permission sur le rôle \`Non verif\`\`voir salon et envoyer un message\``)
              .setTimestamp()
              .setFooter({ text: "Setcaptcha" })
            setTimeout(async () => await message.editReply({ embeds: [Embed] }), 2000)
          })
        }
      }

      if (commande === "goodbye") {

        if (etat === "off") {
          db.query(`UPDATE goodbyes SET goodbye = 'false' WHERE guildId = '${message.guildId}'`)

          return await message.followUp({ embeds: [cEmbed] }).then(() => {

            let Embed = new Discord.EmbedBuilder()
              .setColor("#FFE800")
              .setTitle(`setgoodbye`)
              .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
              .setDescription(`Le goodbye est bien désactiver sur le channel`)
              .setTimestamp()
              .setFooter({ text: "goodbye" })
            setTimeout(async () => await message.editReply({ embeds: [Embed] }), 2000)
          })

        } else {

          let channel = args.getChannel("salon")
          if (!channel) return message.followUp("pas de salon Indiqué")
          channel = message.guild.channels.cache.get(channel.id)
          if (!channel) return message.followUp("Pas de salon trouvée")

          db.query(`UPDATE goodbyes SET goodbye = '${channel.id}' WHERE guildId = '${message.guildId}'`)

          return await message.followUp({ embeds: [cEmbed] }).then(() => {

            let Embed = new Discord.EmbedBuilder()
              .setColor("#FFE800")
              .setTitle(`setgoodbye`)
              .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
              .setDescription(`Le goodbye est bien active sur le salon ${channel}`)
              .setTimestamp()
              .setFooter({ text: "goodbye" })

            setTimeout(async () => await message.editReply({ embeds: [Embed] }), 2000)
          })
        }
      }

      if (commande === "logs") {

        if (etat === "off") {

          db.query(`UPDATE server SET logs = 'false' WHERE guild = '${message.guildId}'`)

          return await message.followUp({ embeds: [cEmbed] }).then(() => {

            let Embed = new Discord.EmbedBuilder()
              .setColor("#FFE800")
              .setTitle(`setlogs`)
              .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
              .setDescription(`Le setlogs est bien désactiver sur le channel`)
              .setTimestamp()
              .setFooter({ text: "setlogs" })
            setTimeout(async () => await message.editReply({ embeds: [Embed] }), 2000)
          })

        } else {

          let channel = args.getChannel("salon")
          if (!channel) return message.followUp("Inidique un salon pour activer les logs !")
          channel = message.guild.channels.cache.get(channel.id)
          if (!channel) return message.followUp("Pas de salon trouvé !")

          db.query(`UPDATE server SET logs = '${channel.id}' WHERE guild = '${message.guildId}'`)

          return await message.followUp({ embeds: [cEmbed] }).then(() => {

            let Embed = new Discord.EmbedBuilder()
              .setColor("#FFE800")
              .setTitle(`setlogs`)
              .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
              .setDescription(`Le setlogs est bien activer sur le channel`)
              .setTimestamp()
              .setFooter({ text: "setlogs" })
            setTimeout(async () => await message.editReply({ embeds: [Embed] }), 2000)
          })
        }
      }

      if (commande === "suggest") {
        if (etat === "off") {
          db.query(`UPDATE suggests SET suggest = 'false' WHERE guildId = '${message.guildId}'`)

          return await message.followUp({ embeds: [cEmbed] }).then(() => {

            let Embed = new Discord.EmbedBuilder()
              .setColor("#FFE800")
              .setTitle(`setsuggest`)
              .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
              .setDescription(`Le suggest est bien désactiver sur le channel`)
              .setTimestamp()
              .setFooter({ text: "suggest" })
            setTimeout(async () => await message.editReply({ embeds: [Embed] }), 2000)
          })

        } else {

          let channel = args.getChannel("salon")
          if (!channel) return message.followUp("pas de salon Indiqué")
          channel = message.guild.channels.cache.get(channel.id)
          if (!channel) return message.followUp("Pas de salon trouvée")

          db.query(`UPDATE suggests SET suggest = '${channel.id}' WHERE guildId = '${message.guildId}'`)

          return await message.followUp({ embeds: [cEmbed] }).then(() => {

            let Embed = new Discord.EmbedBuilder()
              .setColor("#FFE800")
              .setTitle(`setsuggest`)
              .setThumbnail(bot.user.displayAvatarURL({ dynamic: true }))
              .setDescription(`Le suggest est bien active sur le salon ${channel}`)
              .setTimestamp()
              .setFooter({ text: "suggest" })
            setTimeout(async () => await message.editReply({ embeds: [Embed] }), 2000)
          })
        }
      }

      if (commande === "welcome") {

        if (etat === "off") {
          db.query(`UPDATE welcomes SET welcome = 'false' WHERE guildId = '${message.guildId}'`)

          return await message.followUp({ embeds: [cEmbed] }).then(() => {

            let Embed = new Discord.EmbedBuilder()
              .setColor("#FFE800")
              .setTitle(`setwelcome`)
              .setThumbnail(bot.user.displayAvatarURL({ dynamic: true }))
              .setDescription(`Le welcome est bien désactiver sur le channel`)
              .setTimestamp()
              .setFooter({ text: "welcome" })
            setTimeout(async () => await message.editReply({ embeds: [Embed] }), 2000)
          })

        } else {

          let channel = args.getChannel("salon")
          if (!channel) return message.followUp("pas de salon Indiqué")
          channel = message.guild.channels.cache.get(channel.id)
          if (!channel) return message.followUp("Pas de salon trouvée")

          db.query(`UPDATE welcomes SET welcome = '${channel.id}' WHERE guildId = '${message.guildId}'`)

          return await message.followUp({ embeds: [cEmbed] }).then(() => {

            let Embed = new Discord.EmbedBuilder()
              .setColor("#FFE800")
              .setTitle(`setwelcome`)
              .setThumbnail(bot.user.displayAvatarURL({ dynamic: true }))
              .setDescription(`Le welcome est bien active sur le salon ${channel}`)
              .setTimestamp()
              .setFooter({ text: "welcome" })

            setTimeout(async () => await message.editReply({ embeds: [Embed] }), 000)
          })
        }
      }

    } catch (err) {
      console.log(`
      >------------ OUPS UNE ERREUR ------------<
      
      UNE ERREUR DANS LA COMMANDE SETCOMMANDES !!

      >--------------- L'ERREUR ----------------<

      ${err}
      
      >-----------------------------------------<
      `)
      fs.writeFile("./erreur.txt", `${err.stack}`, () => { return })
      let channel = await bot.channels.cache.get("1041816985920610354")
      channel.send({ content: `⚠️ UNE ERREUR DANS LA COMMANDE SETCOMMANDES !!`, files: [{ attachment: './erreur.txt', name: 'erreur.txt', description: "L'erreur obtenue" }] })
    }
  }
}