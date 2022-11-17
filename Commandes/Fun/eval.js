const Discord = require("discord.js");
const fs = require("fs");
const { eval } = require("../.././json/emoji.json");
const { EmbedBuilder } = require("discord.js");

module.exports = {

  name: "eval",
  description: "Permet de calcule",
  permission: "Aucune",
  dm: false,
  category: "🥳Fun",
  options: [
    {
      type: "number",
      name: "nombre1",
      description: "Quel est le chiffre ?",
      required: true,
      autocomplete: false
    },
    {
      type: "string",
      name: "symbole",
      description: "Quel est le symbole ?",
      required: true,
      autocomplete: true
    },
    {
      type: "number",
      name: "nombre2",
      description: "Quel est le chiffre ?",
      required: true,
      autocomplete: false
    }
  ],

  async run(bot, message, args) {

    try {

      await message.deferReply()

      let number = args.getNumber("nombre1")
      let number1 = args.getNumber("nombre2")
      let Calcule = args.getString("symbole")

      if (Calcule === "+") {

        let calculeEmbed = new Discord.EmbedBuilder()
          .setColor("#FF5D00")
          .setTitle(`Chargement de la commande Eval !!`)
          .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
          .setDescription(`${eval} **__Je calcule le résulta__** ${eval}
                    
                    > **Sur le serveur :** ${message.guild.name}

                    \`Veuillez patienter\``)
          .setTimestamp()
          .setFooter({ text: "Eval" })
        return await message.followUp({ embeds: [calculeEmbed] }).then(() => {

          calculeEmbed = new EmbedBuilder()
            .setTitle(`Calcule avec le symbole +`)
            .setColor("#00A705")
            .setDescription(`> ${eval}  ${number} + ${number1} = ${number + number1}`)
            .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
            .setTimestamp()
            .setFooter({ text: "Eval" })
          setTimeout(async () => await message.editReply({ embeds: [calculeEmbed] }), 1000)
        })
      } else if (Calcule === "-") {

        let calculeEmbed = new Discord.EmbedBuilder()
          .setColor("#FF5D00")
          .setTitle(`Chargement de la commande Eval !!`)
          .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
          .setDescription(`${eval} **__Je calcule le résulta__** ${eval}
                
                > **Sur le serveur :** ${message.guild.name}

                \`Veuillez patienter\``)
          .setTimestamp()
          .setFooter({ text: "Eval" })
        return await message.followUp({ embeds: [calculeEmbed] }).then(() => {

          calculeEmbed = new EmbedBuilder()
            .setTitle(`Calcule avec le symbole -`)
            .setColor("#00A705")
            .setDescription(`> ${eval} ${number} - ${number1} = ${number - number1}`)
            .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
            .setTimestamp()
            .setFooter({ text: "Eval" })
          setTimeout(async () => await message.editReply({ embeds: [calculeEmbed] }), 1000)
        })
      } else if (Calcule === "*") {

        let calculeEmbed = new Discord.EmbedBuilder()
          .setColor("#FF5D00")
          .setTitle(`Chargement de la commande Eval !!`)
          .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
          .setDescription(`${eval} **__Je calcule le résulta__** ${eval}
                
                > **Sur le serveur :** ${message.guild.name}

                \`Veuillez patienter\``)
          .setTimestamp()
          .setFooter({ text: "Eval" })
        return await message.followUp({ embeds: [calculeEmbed] }).then(() => {

          calculeEmbed = new EmbedBuilder()
            .setTitle(`Calcule avec le symbole *`)
            .setColor("#00A705")
            .setDescription(`${eval} ${number} * ${number1} = ${number * number1}`)
            .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
            .setTimestamp()
            .setFooter({ text: "Eval" })
          setTimeout(async () => await message.editReply({ embeds: [calculeEmbed] }), 1000)
        })
      } else if (Calcule === "%") {

        let calculeEmbed = new Discord.EmbedBuilder()
          .setColor("#FF5D00")
          .setTitle(`Chargement de la commande Eval !!`)
          .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
          .setDescription(`${eval} **__Je calcule le résulta__** ${eval}
                
                > **Sur le serveur :** ${message.guild.name}

                \`Veuillez patienter\``)
          .setTimestamp()
          .setFooter({ text: "Eval" })
        return await message.followUp({ embeds: [calculeEmbed] }).then(() => {

          calculeEmbed = new EmbedBuilder()
            .setTitle(`$Calcule avec le symbole %`)
            .setColor("#00A705")
            .setDescription(`> ${eval} ${number} % ${number1} = ${number % number1}`)
            .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
            .setTimestamp()
            .setFooter({ text: "Eval" })
          setTimeout(async () => await message.editReply({ embeds: [calculeEmbed] }), 1000)
        })
      } else if (Calcule === "/") {

        let calculeEmbed = new Discord.EmbedBuilder()
          .setColor("#FF5D00")
          .setTitle(`Chargement de la commande Eval !!`)
          .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
          .setDescription(`${eval} **__Je calcule le résulta__** ${eval}
                    
                    > **Sur le serveur :** ${message.guild.name}

                    \`Veuillez patienter\``)
          .setTimestamp()
          .setFooter({ text: "Eval" })
        return await message.followUp({ embeds: [calculeEmbed] }).then(() => {

          calculeEmbed = new EmbedBuilder()
            .setTitle(`Calcule avec le symbole /`)
            .setColor("#00A705")
            .setDescription(`> ${eval} ${number} / ${number1} = ${number / number1}`)
            .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
            .setTimestamp()
            .setFooter({ text: "Eval" })
          setTimeout(async () => await message.editReply({ embeds: [calculeEmbed] }), 1000)
        })
      } else if (Calcule === "+" || "-" || "*" || "/") {

        let mauvais = new Discord.EmbedBuilder()
          .setTitle(`${eval} **__Les category des Symbole dispo__** ${eval}`)
          .setColor("#000000")
          .setDescription("Les choix de Symbole dispo sont : \n\n \`+\` \`-\` \`/\` \`*\` \`%\`")
          .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
          .setTimestamp()
          .setFooter({ text: "Symbole" })
        return await message.followUp({ embeds: [mauvais] })
      }

    } catch (err) {
      console.log(`
      >------------ OUPS UNE ERREUR ------------<
      
      UNE ERREUR DANS LA COMMANDE EVAL !!

      >--------------- L'ERREUR ----------------<

      ${err}
      
      >-----------------------------------------<
      `)
      fs.writeFile("./erreur.txt", `${err.stack}`, () => { return })
      let channel = await bot.channels.cache.get("1041816985920610354")
      channel.send({ content: `⚠️ UNE ERREUR DANS LA COMMANDE EVAL !!`, files: [{ attachment: './erreur.txt', name: 'erreur.txt', description: "L'erreur obtenue" }] })
    }
  }
}
