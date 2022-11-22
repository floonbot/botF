const Discord = require("discord.js");
const fs = require("fs");
const moment = require("moment");
require("moment-duration-format");
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType, SelectMenuBuilder } = require("discord.js");
const { pingE, TimeE, pc, cpuE, ram, ssd, Sys, cm, wifi, Sos, infoE } = require("../json/emoji.json");


module.exports = async (bot, interaction) => {


  if (interaction.type === Discord.InteractionType.ApplicationCommandAutocomplete) {

    try {

      let entry = interaction.options.getFocused()

      if (interaction.commandName === "help") {

        let choices = bot.commands.filter(cmd => cmd.name.includes(entry))
        await interaction.respond(entry === "" ? bot.commands.map(cmd => ({ name: cmd.name, value: cmd.name })) : choices.map(choice => ({ name: choice.name, value: choice.name })))
      }

      if (interaction.commandName === "eval") {

        let choices = ["+", "-", "*", "/", "%"]
        let sortie = choices.filter(c => c.includes(entry))
        await interaction.respond(entry === "" ? sortie.map(c => ({ name: c, value: c })) : sortie.map(c => ({ name: c, value: c })))
      }

      if (interaction.commandName === "setcommandes") {

        let choices;

        const focusedOption = interaction.options.getFocused(true);

        if (focusedOption.name === 'commande') {
          choices = ['logs', 'antiraid', 'captcha', 'suggest', 'welcome', 'goodbye']
        }

        if (focusedOption.name === 'état') {
          choices = ['on', 'off']
        }

        let sortie = choices.filter(c => c.includes(entry))
        await interaction.respond(entry === "" ? sortie.map(c => ({ name: c, value: c })) : sortie.map(c => ({ name: c, value: c })))
      }

      if (interaction.commandName === "setstatus") {

        let choices = ["Listening", "Playing", "Competing", "Watching", "Streaming"]
        let sortie = choices.filter(c => c.includes(entry))
        await interaction.respond(entry === "" ? sortie.map(c => ({ name: c, value: c })) : sortie.map(c => ({ name: c, value: c })))
      }

      if (interaction.commandName === "gif") {

        let choices = ["kill", "kiss", "badass", "punch"]
        let sortie = choices.filter(c => c.includes(entry))
        await interaction.respond(entry === "" ? sortie.map(c => ({ name: c, value: c })) : sortie.map(c => ({ name: c, value: c })))
      }

      if (interaction.commandName === "nsfw") {

        let choices = ["pussy", "aHarem"]
        let sortie = choices.filter(c => c.includes(entry))
        await interaction.respond(entry === "" ? sortie.map(c => ({ name: c, value: c })) : sortie.map(c => ({ name: c, value: c })))
      }

      if (interaction.commandName === "pfc") {

        let choices = ["pierre", "feuille", "ciseaux"]
        let sortie = choices.filter(c => c.includes(entry))
        await interaction.respond(entry === "" ? sortie.map(c => ({ name: c, value: c })) : sortie.map(c => ({ name: c, value: c })))
      }

    } catch (err) {
      console.log(`
      >------------ OUPS UNE ERREUR ------------<
      
      UNE ERREUR DANS L'EVENT AUTOCOMPLETE !!
  
      >--------------- L'ERREUR ----------------<

      ${err}
      
      >-----------------------------------------<
      `)
      fs.writeFile("./erreur.txt", `${err.stack}`, () => { return })
      let channel = await bot.channels.cache.get("1041816985920610354")
      channel.send({ content: `⚠️ UNE ERREUR DANS L'EVENT AUTOCOMPLETE !!`, files: [{ attachment: './erreur.txt', name: 'erreur.txt', description: "L'erreur obtenue" }] })
    }
  }

  if (interaction.type === Discord.InteractionType.ApplicationCommand) {

    try {

      const command = interaction.client.commands.get(interaction.commandName);
      command?.run?.(bot, interaction, interaction.options, bot.db)

    } catch (err) {
      console.log(`
      >------------ OUPS UNE ERREUR ------------<
      
      UNE ERREUR DANS L'EVENT POUR CREE LA COMMANDE !!

      >--------------- L'ERREUR ----------------<

      ${err}
      
      >-----------------------------------------<
      `)
      fs.writeFile("./erreur.txt", `${err.stack}`, () => { return })
      let channel = await bot.channels.cache.get("1041816985920610354")
      channel.send({ content: `⚠️ UNE ERREUR DANS L'EVENT POUR CREE LA COMMANDE !!`, files: [{ attachment: './erreur.txt', name: 'erreur.txt', description: "L'erreur obtenue" }] })
    }
  }

  if (interaction.isButton()) {

    if (interaction.customId.startsWith("reglement")) {

      try {
        const role = interaction.guild.roles.cache.get(interaction.customId.split("reglement")[1])
        interaction.member.roles.add(role.id).then(() => {
          interaction.reply({ content: `<@&${role.id}> a étais ajouter `, ephemeral: true })
        })

      } catch (err) {
        console.log(`
      >------------ OUPS UNE ERREUR ------------<
      
      UNE ERREUR DANS L'EVENT POUR LE REGLEMENT !!
  
      >--------------- L'ERREUR ----------------<

      ${err}
      
      >-----------------------------------------<
      `)
        fs.writeFile("./erreur.txt", `${err.stack}`, () => { return })
        let channel = await bot.channels.cache.get("1041816985920610354")
        channel.send({ content: `⚠️ UNE ERREUR DANS L'EVENT REGLEMENT !!`, files: [{ attachment: './erreur.txt', name: 'erreur.txt', description: "L'erreur obtenue" }] })
      }
    }
    try {

      if (interaction.customId.startsWith("Ping")) {

        const ping = Date.now() - interaction.createdAt;
        const api_ping = bot.ws.ping;
        const uptime = moment.duration(interaction.client.uptime).format(" D[d], H[h], m[m], s[s]")

        const row = new ActionRowBuilder()
          .addComponents(
            new ButtonBuilder()
              .setLabel("Actualiser")
              .setStyle(ButtonStyle.Success)
              .setCustomId("Ping")
          )

        pingEmbed = new Discord.EmbedBuilder()
          .setColor("#0070FF")
          .setTitle(`La lantence du bot`)
          .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
          .setDescription(`
                    
                    > ${pingE} **Bot :** \`${ping}\` ms 
                    > ${pingE} **API :** \`${api_ping}\` ms
                    > ${TimeE}**Temps Uptime :** ${uptime}`)
          .setTimestamp()
          .setFooter({ text: "Ping" })
        interaction.update({ embeds: [pingEmbed], components: [row] })
      }

    } catch (err) {
      console.log(`
      >------------ OUPS UNE ERREUR ------------<
      
      UNE ERREUR DANS L'EVENT PING !!
  
      >--------------- L'ERREUR ----------------<
  
      ${err}
      
      >-----------------------------------------<
      `)
      fs.writeFile("./erreur.txt", `${err.stack}`, () => { return })
      let channel = await bot.channels.cache.get("1041816985920610354")
      channel.send({ content: `⚠️ UNE ERREUR DANS L'EVENT PING !!`, files: [{ attachment: './erreur.txt', name: 'erreur.txt', description: "L'erreur obtenue" }] })
    }



      if (interaction.customId === "primary") {

        let channel = await interaction.guild.channels.create({
          name: `${interaction.user.username} ticket`,
          type: Discord.ChannelType.GuildText,
          permissionOverwrites: [
            {
              id: interaction.guild.roles.everyone,
              deny: [Discord.PermissionFlagsBits.ViewChannel],
            }, {
              id: interaction.user,
              allow: [Discord.PermissionFlagsBits.SendMessages, Discord.PermissionFlagsBits.ViewChannel, Discord.PermissionFlagsBits.ReadMessageHistory],
            }
          ],
        })

        await interaction.reply({ content: `**Ticket créer avec succes ${channel}**`, ephemeral: true })

        const clearembed = new Discord.EmbedBuilder()
          .setTitle(`${interaction.user.username}`)
          .setDescription(`${interaction.user}\n merci de patienter que le staff vienent vous aider ecrivez votre probleme dans le ticket`)
          .setColor("Aqua")

        const deletebutton = new Discord.ActionRowBuilder()
          .addComponents(
            new ButtonBuilder()
              .setCustomId('delete')
              .setEmoji("❌")
              .setLabel('Supprimer le ticket')
              .setStyle(ButtonStyle.Danger)
        );
        await channel.send({ embeds: [clearembed], components: [deletebutton] })
      }

    try {

      if (interaction.customId === "delete") {

        const surbutton = new Discord.ActionRowBuilder()
          .addComponents(
            new ButtonBuilder()
              .setCustomId('oui')
              .setLabel('oui')
              .setStyle(ButtonStyle.Primary)
          )
          .addComponents(
            new ButtonBuilder()
              .setCustomId('non')
              .setLabel('non')
              .setStyle(ButtonStyle.Danger)
        )
        await interaction.reply({ content: "**Etes vous sur de vouloir supprimer ce ticket ?**", components: [surbutton], ephemeral: true })
      }

      if (interaction.customId === "oui") {

        await interaction.guild.channels.delete(interaction.channel)
      }
      if (interaction.customId === "non") {
        await interaction.reply({ content: "**Suppresion de ticket annulé**", ephemeral: true })
      }

    } catch (err) {
      console.log(`
      >------------ OUPS UNE ERREUR ------------<
      
      UNE ERREUR DANS L'EVENT TICKET !!
  
      >--------------- L'ERREUR ----------------<
  
      ${err}
      
      >-----------------------------------------<
      `)
      fs.writeFile("./erreur.txt", `${err.stack}`, () => { return })
      let channel = await bot.channels.cache.get("1041816985920610354")
      channel.send({ content: `⚠️ UNE ERREUR DANS L'EVENT TICKET !!`, files: [{ attachment: './erreur.txt', name: 'erreur.txt', description: "L'erreur obtenue" }] })
    }
  }

  if (interaction.isSelectMenu()) {

    if (interaction.customId === 'help') {

      try {
        const row = new Discord.ActionRowBuilder()
          .addComponents(
            new Discord.SelectMenuBuilder()
              .setCustomId('help')
              .setPlaceholder('Choix')
              .addOptions(
                {

                  label: "Select pour toute l'accueil",
                  description: 'accueil',
                  value: 'choix7',
                },
                {

                  label: 'Select pour toute les commandes',
                  description: 'Toute les commandes',
                  value: 'choix1',
                },
                {

                  label: "Select pour les commandes d'information 👆🏻",
                  description: 'Commande information',
                  value: 'choix3',
                },
                {

                  label: 'Select pour les commandes xp 💹',
                  description: 'Commande xp',
                  value: 'choix2',
                },
                {

                  label: 'Select pour les setcommandes 🗃️',
                  description: 'Set des commandes',
                  value: 'choix6',
                },
                {

                  label: "Select pour les commandes fun 🥳",
                  description: 'Commande fun',
                  value: 'choix4',
                },
                {

                  label: "Select pour les commandes modérateur 🧑🏻‍⚖️",
                  description: 'Commande modérateur',
                  value: 'choix5',
                }
              )
          )

        if (interaction.values == 'choix1') {

          let command;

          if (!command) {

            let categories = [];
            bot.commands.forEach(command => {
              if (!categories.includes(command.category)) categories.push(command.category)
            })

            let Embed = new Discord.EmbedBuilder()
              .setColor("#0070FF")
              .setTitle(`Info des commandes`)
              .setThumbnail(bot.user.displayAvatarURL({ dynamic: true }))
              .setTimestamp()
              .setFooter({ text: "Commandes du bot" })

            await categories.sort().forEach(async cat => {

              let commands = bot.commands.filter(cmd => cmd.category === cat)
              Embed.addFields({ name: `${cat}`, value: `${commands.map(cmd => `\`${cmd.name}\` : ${cmd.description}`).join("\n")}` })
            })
            await interaction.update({ embeds: [Embed], components: [row] })

          }
        }

        if (interaction.values == 'choix2') {

          let Embed = new Discord.EmbedBuilder()
            .setColor("#0070FF")
            .setTitle(`Info des commandes`)
            .setThumbnail(bot.user.displayAvatarURL({ dynamic: true }))
            .setDescription(`${infoE} **__Commande pour les commandes xp__**
  
                  \`rank\` : Donne l'xp d'un membre
                  \`leaderboard\` : Envoie le top 10 des membres avec le plus d'xp`)
            .setTimestamp()
            .setFooter({ text: "Commandes du bot" })

          await interaction.update({ embeds: [Embed], components: [row] })
        }

        if (interaction.values == 'choix3') {

          let Embed = new Discord.EmbedBuilder()
            .setColor("#0070FF")
            .setTitle(`Info des commandes`)
            .setThumbnail(bot.user.displayAvatarURL({ dynamic: true }))
            .setDescription(`${infoE} **__Commande pour les commandes information__**
  
                  \`admin-list\` : Permet de regarder le nombre d'admin
                  \`booster-list\` : Permet de voir la liste des boosts sur le serveur
                  \`bot-info\` : Les informations sur le bot
                  \`bot-list\` : Permet de regarder le nombre de bot
                  \`help\` : Donne les commands du bot
                  \`ip\` : Permet d'avoir l'ip du serveur
                  \`machine-info\` : Donne des information sur la machine
                  \`ping\` : Donne le ping du bot
                  \`role-member-list\` : Permet de voir les membres avec le rôle
                  \`serveur-info\` : Permet de voir les Information du serveur
                  \`serveur-list\` : Permet de voit le top5 des serveurs du bot
                  \`suggest\` : Permet d'envoyer une suggestion
                  \`url\` : Permet de voir l'url personnaliser du serveur
                  \`user-info\` : Permet de voir les informations d'un membre`)
            .setTimestamp()
            .setFooter({ text: "Commandes du bot" })

          await interaction.update({ embeds: [Embed], components: [row] })
        }

        if (interaction.values == 'choix4') {

          let Embed = new Discord.EmbedBuilder()
            .setColor("#0070FF")
            .setTitle(`Info des commandes`)
            .setThumbnail(bot.user.displayAvatarURL({ dynamic: true }))
            .setDescription(`${infoE} **__Commande pour les commandes fun__**
  
                  \`8ball\` : Pose une question et il te dira la vérité
                  \`avatar\` : Permet de récupérer l'avatar d'un membre
                  \`dé\` : Permet de faire choisir le bot entre 1 et 6
                  \`eval\` : Permet de calcule
                  \`gif\` : Permet de effectuer un gif
                  \`nsfw\` : envoye une image nsfw
                  \`pfc\` : Joue à pfc
                  \`random\` : Le bot prend au hasard un nombre entre 1 et 100`)
            .setTimestamp()
            .setFooter({ text: "Commandes du bot" })

          await interaction.update({ embeds: [Embed], components: [row] })
        }

        if (interaction.values == 'choix5') {

          let Embed = new Discord.EmbedBuilder()
            .setColor("#0070FF")
            .setTitle(`Info des commandes`)
            .setThumbnail(bot.user.displayAvatarURL({ dynamic: true }))
            .setDescription(`${infoE} **__Commande pour les commandes modérateur__**
  
                  \`add-lemoji\` : Permet d'ajouter un émoji sur le serveur
                  \`ban\` : Pour Ban le membre qui à fait l'infractions
                  \`black-list-add\` : Ajoute un joueur à la blacklist
                  \`black-list-remove\` : Supprime un joueur de la blacklist
                  \`black-list\` : Affiche les membres blacklist
                  \`clear\` : Efface beaucoup de messages
                  \`dm\` : DM un membre
                  \`embed-builder\` : Envoyer un embed personnalisé
                  \`history\` : Permet de connaitre les infractions d'un utilisateur
                  \`kick\` : Pour kick un membre qui à fait une infractions
                  \`lock\` : Permet de lock un salon
                  \`mute\` : Permet de mute un membre sur le serveur
                  \`nuke\` : Recréer un salon
                  \`règlement\` : Choisir le salon pour mettre un règlement
                  \`say\` : Envoyer un message sous l'identiter du bot
                  \`ticket\` : envoi l'embed des ticket
                  \`unban\` : unBan un membre
                  \`unlock\` : Permet de unlock un salon
                  \`unmute\` : Permet d'enlever le mute d'un membre
                  \`unwarn\` : Permet de supprimer un warn d'un membre
                  \`warn\` : Pour warn un membre sur le serveur
                  \`warnlist\` : Affiche les warns d'un membre`)
            .setTimestamp()
            .setFooter({ text: "Commandes du bot" })

          await interaction.update({ embeds: [Embed], components: [row] })
        }

        if (interaction.values == 'choix6') {

          let Embed = new Discord.EmbedBuilder()
            .setColor("#0070FF")
            .setTitle(`Info des commandes`)
            .setThumbnail(bot.user.displayAvatarURL({ dynamic: true }))
            .setDescription(`${infoE} **__Commande pour les setcommandes__**
  
                  \`setcommandes\` : Paramètre les commandes sur le serveur
                  \`setstatus\` : Paramètre les commandes sur le serveur`)
            .setTimestamp()
            .setFooter({ text: "Commandes du bot" })

          await interaction.update({ embeds: [Embed], components: [row] })
        }

        if (interaction.values == 'choix7') {

          let categories = [];
          bot.commands.forEach(command => {
            if (!categories.includes(command.category)) categories.push(command.category)
          })

          let Embed1 = new Discord.EmbedBuilder()
            .setColor("#0070FF")
            .setThumbnail(bot.user.displayAvatarURL({ dynamic: true }))
            .setDescription(`${infoE} **__Bienvenue sur la commande help__**
  
                    > Commands disponibles : \`${bot.commands.size}\`
                    > Catégories disponibles : \`${categories.length}\``)
            .setTimestamp()
            .setFooter({ text: "Commandes du bot" })

          await interaction.update({ embeds: [Embed1], components: [row] })
        }

      } catch (err) {
        console.log(`
            >------------ OUPS UNE ERREUR ------------<
            
            UNE ERREUR DANS L'EVENT POUR LE HELP !!
        
            >--------------- L'ERREUR ----------------<
  
            ${err}
            
            >-----------------------------------------<
            `)
        fs.writeFile("./erreur.txt", `${err.stack}`, () => { return })
        let channel = await bot.channels.cache.get("1041816985920610354")
        channel.send({ content: `⚠️ UNE ERREUR DANS L'EVENT POUR LE HELP !!`, files: [{ attachment: './erreur.txt', name: 'erreur.txt', description: "L'erreur obtenue" }] })
      }
    }
  }
}







