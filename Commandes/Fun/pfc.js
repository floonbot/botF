const Discord = require("discord.js");
const fs = require("fs");
const { pfc } = require("../.././json/emoji.json");


module.exports = {

  name: 'pfc',
  description: 'Joue à pfc',
  permission: "Aucune",
  dm: false,
  category: "🥳Fun",
  options: [
    {
      type: "string",
      name: "choix",
      description: "Quel est ton choix ?",
      required: true,
      autocomplete: true,
    },
  ],
  async run(bot, message, args) {

    try {

      let joueursH = args.getString("choix")
      let joueursB1 = ["pierre", "feuille", "ciseaux"]

      let punchradom = Math.floor(Math.random() * joueursB1.length);
      let joueursB = joueursB1[punchradom];

      const fpcEmbed = new Discord.EmbedBuilder()
        .setColor("#FF5D00")
        .setTitle(`Chargement de la commande pfc !!`)
        .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
        .setDescription(`${pfc} **__je réfléchi à mon choix__** ${pfc}
                
                > **Sur le serveur :** ${message.guild.name}
                
                \`Veuillez patienter\``)

        .setTimestamp()
        .setFooter({ text: "Pfc" })

      await message.deferReply()

      if (joueursH === "pierre" && joueursB === "feuille") {

        return await message.followUp({ embeds: [fpcEmbed] }).then(() => {

          let Embed = new Discord.EmbedBuilder()
            .setColor("#00A705")
            .setDescription(`${pfc} **Les résultats sont :** ${pfc}
                    
                    > **Joueur ${message.user.tag} : ** a choisi \`${joueursH}\` perdu
                    > **Bot ${bot.user.tag} : ** a choisi \`${joueursB}\` gagner`)
            .setTimestamp()
            .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64, }))
            .setFooter({ text: "pfc" })
          setTimeout(async () => await message.editReply({ embeds: [Embed] }), 2000)
        })
      } else if (joueursH === "pierre" && joueursB === "pierre") {

        return await message.followUp({ embeds: [fpcEmbed] }).then(() => {

          let Embed = new Discord.EmbedBuilder()
            .setColor("#00A705")
            .setDescription(`${pfc} **Les résultats sont :**
                    
                    > **Joueur ${message.user.tag} : ** a choisi \`${joueursH}\` égalité
                    > **Bot ${bot.user.tag} : ** a choisi \`${joueursB}\` égalité`)
            .setTimestamp()
            .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64, }))
            .setFooter({ text: "pfc" })
          setTimeout(async () => await message.editReply({ embeds: [Embed] }), 2000)
        })
      } else if (joueursH === "pierre" && joueursB === "ciseaux") {

        await message.followUp({ embeds: [fpcEmbed] })

        let Embed = new Discord.EmbedBuilder()
          .setColor("#00A705")
          .setDescription(`${pfc} **Les résultats sont :**
                    
                    > **Joueur ${message.user.tag} : ** a choisi \`${joueursH}\` gagner
                    > **Bot ${bot.user.tag} : ** a choisi \`${joueursB}\` perdu`)
          .setTimestamp()
          .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64, }))
          .setFooter({ text: "pfc" })
        return await message.editReply({ embeds: [Embed] })
      }

      if (joueursH === "feuille" && joueursB === "pierre") {

        return await message.followUp({ embeds: [fpcEmbed] }).then(() => {

          let Embed = new Discord.EmbedBuilder()
            .setColor("#00A705")
            .setDescription(`${pfc} **Les résultats sont :**
                    
                    > **Joueur ${message.user.tag} : ** a choisi \`${joueursH}\` gagner
                    > **Bot ${bot.user.tag} : ** a choisi \`${joueursB}\` perdu`)
            .setTimestamp()
            .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64, }))
            .setFooter({ text: "pfc" })
          setTimeout(async () => await message.editReply({ embeds: [Embed] }), 2000)
        })
      } else if (joueursH === "feuille" && joueursB === "feuille") {

        return await message.followUp({ embeds: [fpcEmbed] }).then(() => {

          let Embed = new Discord.EmbedBuilder()
            .setColor("#00A705")
            .setDescription(`${pfc} **Les résultats sont :**
                    
                        > **Joueur ${message.user.tag} : ** a choisi \`${joueursH}\` égalité
                        > **Bot ${bot.user.tag} : ** a choisi \`${joueursB}\` égalité`)
            .setTimestamp()
            .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64, }))
            .setFooter({ text: "pfc" })
          setTimeout(async () => await message.editReply({ embeds: [Embed] }), 2000)
        })
      } else if (joueursH === "feuille" && joueursB === "ciseaux") {

        return await message.followUp({ embeds: [fpcEmbed] }).then(() => {

          let Embed = new Discord.EmbedBuilder()
            .setColor("#00A705")
            .setDescription(`${pfc} **Les résultats sont :**
                    
                    > **Joueur ${message.user.tag} : ** a choisi \`${joueursH}\` perdu
                    > **Bot ${bot.user.tag} : ** a choisi \`${joueursB}\` gagner`)
            .setTimestamp()
            .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64, }))
            .setFooter({ text: "pfc" })
          setTimeout(async () => await message.editReply({ embeds: [Embed] }), 2000)
        })
      }

      if (joueursH === "ciseaux" && joueursB === "pierre") {

        return await message.followUp({ embeds: [fpcEmbed] }).then(() => {

          let Embed = new Discord.EmbedBuilder()
            .setColor("#00A705")
            .setDescription(`${pfc} **Les résultats sont :**
                    
                    > **Joueur ${message.user.tag} : ** a choisi \`${joueursH}\` perdu
                    > **Bot ${bot.user.tag} : ** a choisi \`${joueursB}\` gagner`)
            .setTimestamp()
            .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64, }))
            .setFooter({ text: "pfc" })
          setTimeout(async () => await message.editReply({ embeds: [Embed] }), 2000)
        })
      } else if (joueursH === "ciseaux" && joueursB === "ciseaux") {

        return await message.followUp({ embeds: [fpcEmbed] }).then(() => {

          let Embed = new Discord.EmbedBuilder()
            .setColor("#00A705")
            .setDescription(`${pfc} **Les résultats sont :**
                    
                    > **Joueur ${message.user.tag} : ** a choisi \`${joueursH}\` égalité
                    > **Bot ${bot.user.tag} : ** a choisi \`${joueursB}\` égalité`)
            .setTimestamp()
            .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64, }))
            .setFooter({ text: "pfc" })
          setTimeout(async () => await message.editReply({ embeds: [Embed] }), 2000)
        })
      } else if (joueursH === "ciseaux" && joueursB === "feuille") {

        return await message.followUp({ embeds: [fpcEmbed] }).then(() => {

          let Embed = new Discord.EmbedBuilder()
            .setColor("#00A705")
            .setDescription(`${pfc} **Les résultats sont :**
                    
                    > **Joueur ${message.user.tag} : ** a choisi \`${joueursH}\` gagner
                    > **Bot ${bot.user.tag} : ** a choisi \`${joueursB}\` perdu`)
            .setTimestamp()
            .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64, }))
            .setFooter({ text: "pfc" })
          setTimeout(async () => await message.editReply({ embeds: [Embed] }), 2000)
        })
      }

      if (joueursH !== "feuille" || joueursH !== "ciseaux" || joueursH !== "pierre") {

        let Embed = new Discord.EmbedBuilder()
          .setColor("#000000")
          .setTitle(`${pfc} **__Les choix du ppc__** ${pfc}`)
          .setDescription("Les choix de pfc dispo sont : \n\n \`pierre\`\n   \`feuille\`\n  \`ciseaux\`\n")
          .setTimestamp()
          .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64, }))
          .setFooter({ text: "pfc" })
        return await message.followUp({ embeds: [Embed] })
      }

    } catch (err) {
      console.log(`
      >------------ OUPS UNE ERREUR ------------<
      
      UNE ERREUR DANS LA COMMANDE PFC !!

      >--------------- L'ERREUR ----------------<

      ${err}
      
      >-----------------------------------------<
      `)
      fs.writeFile("./erreur.txt", `${err.stack}`, () => { return })
      let channel = await bot.channels.cache.get("1041816985920610354")
      channel.send({ content: `⚠️ UNE ERREUR DANS LA COMMANDE PFC !!`, files: [{ attachment: './erreur.txt', name: 'erreur.txt', description: "L'erreur obtenue" }] })

    }
  }
}