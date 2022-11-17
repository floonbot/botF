const fs = require("fs");
const osu = require('node-os-utils');
const cpu = osu.cpu
const mem = osu.mem
const os = osu.os
const si = require('systeminformation');
const { pc, cpuE, ram, ssd, Sys, cm, wifi } = require("../.././json/emoji.json");
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");


module.exports = {

  name: "machine-info",
  description: "Donne des information sur la machine",
  permission: "Aucune",
  dm: false,
  category: "👆🏻Information",

  async run(bot, message) {

    try {

      await message.deferReply()

      const Embed = new EmbedBuilder()
        .setColor("#FF5D00")
        .setTitle(`Chargement des information sur la machine du bot !!`)
        .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
        .setDescription(`${pc}**__Je cherche les informations de la machine__**${pc}

                > ** Sur le serveur:** ${message.guild.name}

            \`veuillez patienter\``)
        .setTimestamp()
        .setFooter({ text: "Info-machine" })
      await message.followUp({ embeds: [Embed] }).then(async () => {

        const cpuUsage = `> Model : \`${await cpu.model()}\`\n> Utilisé: \`${await cpu.usage() + " %"}\`\n> Restant : \`${await cpu.free() + " %"}\`\n> Logique : \`${await cpu.count()}\`\n> Cœur : \`${(await si.cpu()).physicalCores}\`\n> Fréquence : \`${(await si.cpu()).speed}\`\n> Avg :\`${await cpu.loadavg()}\`\n> Avg :\`${await cpu.loadavgTime()}\``;
        const memoryUsage = `> Total : \`${(await mem.info()).totalMemMb + "MB"}\`\n> Utilisé : \`${(await mem.info()).usedMemMb + "MB"}\`\n> Restante : \`${await (await mem.info()).freeMemMb + "MB"}\``
        const operatingSystem = `> Name : \`${os.hostname()}\`\n> Plateforme : \`${os.platform()}\`\n> Type : \`${os.type()}\`\n> Version : \`${os.arch()}\`\n> upTime : \`${os.uptime()}\`\n> Version system \`${si.version()}\` `
        const bios = `> Model : \`${(await si.baseboard()).model}\`\n> Nombre de slot de ram : \`${(await si.baseboard()).memSlots}\`\n> Version du bios : \`${(await si.bios()).version}\`\n> Dernière mis à jour : \`${(await si.bios()).releaseDate}\``
        const reseau = `> Vitesse de connection : \`${(await si.networkInterfaces())[0].speed + " MO"}\`\n> Ms : \`${(await si.networkStats())[0].ms + " ms"}\``
        const Disque = `> Type : \`${(await si.diskLayout())[0].type}\`\n> Nom : \`${(await si.diskLayout())[0].name}\``

        const row = new ActionRowBuilder()
          .addComponents(
            new ButtonBuilder()
              .setLabel("Invite moi")
              .setStyle(ButtonStyle.Link)
              //Mettre le lien de ton bot
              .setURL("https://discord.com/api/oauth2/authorize?client_id=1041282190060826635&permissions=8&scope=bot")
          )

        const embed = new EmbedBuilder()

          .setTitle("**Voici les informations sur la machine**")
          .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
          .setDescription(`${pc} **__Information de la machine__** ${pc}

                    ${cpuE} **__Cpu :__**\n ${cpuUsage}\n
                    ${ram}  **__Ram :__**\n ${memoryUsage}\n
                   ${Sys} **__System :__**\n ${operatingSystem}\n
                   ${cm} **__Carte mère :__**\n ${bios}\n
                  ${wifi}**__Réseau__**\n ${reseau}\n 
                    ${ssd} **__Disque__**\n ${Disque}\n
                  
                    `)
          .setColor("#0070FF")
          .setTimestamp()
          .setFooter({ text: "Info-machine" })

        setTimeout(async () => await message.editReply({ embeds: [embed], components: [row] }), 1000)
      })

    } catch (err) {
      console.log(`
      >------------ OUPS UNE ERREUR ------------<
      
      UNE ERREUR DANS LA COMMANDE MACHINE-INFO !!

      >--------------- L'ERREUR ----------------<

      ${err}
      
      >-----------------------------------------<
      `)
      fs.writeFile("./erreur.txt", `${err.stack}`, () => { return })
      let channel = await bot.channels.cache.get("1041816985920610354")
      channel.send({ content: `⚠️ UNE ERREUR DANS LA COMMANDE MACHINE-INFO !!`, files: [{ attachment: './erreur.txt', name: 'erreur.txt', description: "L'erreur obtenue" }] })
    }
  }
}