const Discord = require("discord.js");
const fs = require("fs");
const { AttachmentBuilder } = require("discord.js");
const { gifE } = require("../.././json/emoji.json");
const { punch, kiss, badass, kill, autres } = require("../../json/saveImage/gif.json");

module.exports = {

  name: "gif",
  description: "Permet de effectuer un gif",
  permission: "Aucune",
  dm: false,
  category: "🥳Fun",
  options: [
    {
      type: "string",
      name: "gif-a-choisir",
      description: "Quel est le gif ?",
      required: true,
      autocomplete: true,
    },
    {
      type: "user",
      name: "membre",
      description: "Quel utilisateur ?",
      required: false,
      autocomplete: false
    },
    {
      type: "string",
      name: "raison",
      description: "Quelle raison ?",
      required: false,
      autocomplete: false
    }
  ],

  async run(bot, message, args) {

    let choix = args.getString("gif-a-choisir")
    const member = message.options.getMember("membre");
    let reason = args.getString("raison");

    try {

      await message.deferReply()

      const cEmbed = new Discord.EmbedBuilder()
        .setColor("#FF5D00")
        .setTitle(`Chargement de la commande gif !!`)
        .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
        .setDescription(`${gifE} **__Je cherche le gif choisi__** ${gifE}

                > **Sur le serveur :** ${message.guild.name}
                 
                  \`Veuillez patienter\``)
        .setTimestamp()
        .setFooter({ text: "Gif" })

      if (!member && reason) {

        return await message.followUp({ embeds: [cEmbed] }).then(() => {

          const file = new AttachmentBuilder(`./assets/gif/autres/${autres}`, { name: `erreur.gif` })

          const Embed = new Discord.EmbedBuilder()
            .setDescription("Le gif choisie ne peut être reçus car il peux pas avoir de raison fournie sans le membre définie !!")
            .setColor("#001540")
            .setImage(`attachment://${file.name}`)
          setTimeout(async () => await message.editReply({ embeds: [Embed], files: [file] }), 2000)
        })
      }
      if (choix === "punch") {

        let punchradom = Math.floor(Math.random() * punch.length);
        let motRandom = punch[punchradom];
        const file = new AttachmentBuilder(`./assets/gif/punch/${motRandom}`, { name: `Punch.gif` })

        if (!member) {

          return await message.followUp({ embeds: [cEmbed] }).then(() => {

            const Embed = new Discord.EmbedBuilder()

              .setColor("DC00FF")
              .setImage(`attachment://${file.name}`)
              .setTimestamp()
            setTimeout(async () => await message.editReply({ embeds: [Embed], files: [file] }), 2000)
          })
        } else if (member && reason) {

          return await message.followUp({ embeds: [cEmbed] }).then(() => {

            const Embed = new Discord.EmbedBuilder()

              .setColor("DC00FF")
              .setImage(`attachment://${file.name}`)
              .setDescription(`${message.user.toString()} a punch ${member.user.toString()} pour la raison : \n\`${reason}\``)
              .setTimestamp()
            setTimeout(async () => await message.editReply({ embeds: [Embed], files: [file] }), 2000)
          })

        } else if (member && !reason) {

          return await message.followUp({ embeds: [cEmbed] }).then(() => {

            const Embed = new Discord.EmbedBuilder()
              .setColor("DC00FF")
              .setImage(`attachment://${file.name}`)
              .setDescription(`${message.user.toString()} a punch ${member.user.toString()}`)
              .setTimestamp()
            setTimeout(async () => await message.editReply({ embeds: [Embed], files: [file] }), 2000)
          })
        }
      }

      if (choix === "kiss") {

        let kissradom = Math.floor(Math.random() * kiss.length);
        let kissmotRandom = kiss[kissradom];
        const file = new AttachmentBuilder(`./assets/gif/kiss/${kissmotRandom}`, { name: `kiss.gif` })

        if (!member) {

          return await message.followUp({ embeds: [cEmbed] }).then(() => {

            const Embed = new Discord.EmbedBuilder()
              .setColor("DC00FF")
              .setImage(`attachment://${file.name}`)
              .setTimestamp()
            setTimeout(async () => await message.editReply({ embeds: [Embed], files: [file] }), 2000)
          })
        } else if (member && reason) {

          return await message.followUp({ embeds: [cEmbed] }).then(() => {

            const Embed = new Discord.EmbedBuilder()
              .setColor("DC00FF")
              .setImage(`attachment://${file.name}`)
              .setDescription(`${message.user.toString()} a kiss ${member.user.toString()} pour la raison : \n\`${reason}\``)
              .setTimestamp()
            setTimeout(async () => await message.editReply({ embeds: [Embed], files: [file] }), 2000)
          })
        } else if (member && !reason) {

          return await message.followUp({ embeds: [cEmbed] }).then(() => {

            const Embed = new Discord.EmbedBuilder()
              .setColor("DC00FF")
              .setImage(`attachment://${file.name}`)
              .setDescription(`${message.user.toString()} a kiss ${member.user.toString()}`)
              .setTimestamp()
            setTimeout(async () => await message.editReply({ embeds: [Embed], files: [file] }), 2000)
          })
        }
      }

      if (choix === "badass") {

        let badassradom = Math.floor(Math.random() * badass.length);
        let badassmotRandom = badass[badassradom];
        const file = new AttachmentBuilder(`./assets/gif/badass/${badassmotRandom}`, { name: `badass.gif` })

        if (!member) {

          return await message.followUp({ embeds: [cEmbed] }).then(() => {

            const Embed = new Discord.EmbedBuilder()
              .setColor("DC00FF")
              .setImage(`attachment://${file.name}`)
              .setTimestamp()
            setTimeout(async () => await message.editReply({ embeds: [Embed], files: [file] }), 2000)
          })
        } else if (member && !reason) {

          return await message.followUp({ embeds: [cEmbed] }).then(() => {

            const Embed = new Discord.EmbedBuilder()
              .setColor("DC00FF")
              .setImage(`attachment://${file.name}`)
              .setDescription(`${message.user.toString()} met la pression à  ${member.user.toString()}`)
              .setTimestamp()
            setTimeout(async () => await message.editReply({ embeds: [Embed], files: [file] }), 2000)
          })
        } else if (member && reason) {

          return await message.followUp({ embeds: [cEmbed] }).then(() => {

            const Embed = new Discord.EmbedBuilder()
              .setColor("DC00FF")
              .setImage(`attachment://${file.name}`)
              .setDescription(`${message.user.toString()} met la pression à ${member.user.toString()} pour la raison : \n\`${reason}\``)
              .setTimestamp()
            setTimeout(async () => await message.editReply({ embeds: [Embed], files: [file] }), 2000)
          })
        }
      }

      if (choix === "kill") {

        let killradom = Math.floor(Math.random() * kill.length);
        let killmotRandom = kill[killradom];
        const file = new AttachmentBuilder(`./assets/gif/kill/${killmotRandom}`, { name: `kill.gif` })

        if (!member) {

          return await message.followUp({ embeds: [cEmbed] }).then(() => {
            const Embed = new Discord.EmbedBuilder()
              .setColor("DC00FF")
              .setImage(`attachment://${file.name}`)
              .setTimestamp()
            setTimeout(async () => await message.editReply({ embeds: [Embed], files: [file] }), 2000)
          })
        } else if (member && !reason) {

          return await message.followUp({ embeds: [cEmbed] }).then(() => {

            const Embed = new Discord.EmbedBuilder()
              .setColor("DC00FF")
              .setImage(`attachment://${file.name}`)
              .setDescription(`${message.user.toString()} a kill ${member.user.toString()}`)
              .setTimestamp()
            setTimeout(async () => await message.editReply({ embeds: [Embed], files: [file] }), 2000)
          })
        } else if (member && reason) {

          return await message.followUp({ embeds: [cEmbed] }).then(() => {

            const Embed = new Discord.EmbedBuilder()
              .setColor("DC00FF")
              .setImage(`attachment://${file.name}`)
              .setDescription(`${message.user.toString()} a kill ${member.user.toString()} pour la raison : \n\`${reason}\``)
              .setTimestamp()
            setTimeout(async () => await message.editReply({ embeds: [Embed], files: [file] }), 2000)
          })
        }
      }

      if (choix !== "kill" || choix !== "badass" || choix !== "kiss" || choix !== "punch") {
        let mauvais = new Discord.EmbedBuilder()
          .setTitle(`${gifE} **__Les category des gif dispo__** ${gifE}`)
          .setColor("#000000")
          .setDescription("Les choix de gif dispo sont : \n\n \`kiss\`\n \`kill\`\n \`badass\`\n \`punch\`")
          .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
          .setTimestamp()
          .setFooter({ text: "gif" })
        return await message.followUp({ embeds: [mauvais] })
      }
    } catch (err) {
      console.log(`
      >------------ OUPS UNE ERREUR ------------<
      
      UNE ERREUR DANS LA COMMANDE GIF !!

      >--------------- L'ERREUR ----------------<

      ${err}
      
      >-----------------------------------------<
      `)
      fs.writeFile("./erreur.txt", `${err.stack}`, () => { return })
      let channel = await bot.channels.cache.get("1041816985920610354")
      channel.send({ content: `⚠️ UNE ERREUR DANS LA COMMANDE GIF !!`, files: [{ attachment: './erreur.txt', name: 'erreur.txt', description: "L'erreur obtenue" }] })
    }
  }
}