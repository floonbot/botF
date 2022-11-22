const Discord = require("discord.js");
const fs = require("fs");
const { Sos, infoE } = require("../.././json/emoji.json");

module.exports = {

  name: "help",
  description: "Donne les commands du bot",
  permission: "Aucune",
  dm: false,
  category: "👆🏻Information",


  async run(bot, message) {

    let command;

    await message.deferReply()

    try {
      if (!command) {

        let categories = [];
        bot.commands.forEach(command => {
          if (!categories.includes(command.category)) categories.push(command.category)
        })

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
                  description: 'Commande fun ',
                  value: 'choix4',
                },
                {

                  label: "Select pour les commandes modérateur 🧑🏻‍⚖️",
                  description: 'Commande modérateur',
                  value: 'choix5',
                }
              )
          )

        let botEmbed = new Discord.EmbedBuilder()
          .setColor("#FF5D00")
          .setTitle(`Chargement de la commande bot-info !!`)
          .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
          .setDescription(`${Sos} **__Je cherche les commandes !!__** ${Sos}

            > **Sur le serveur :** ${message.guild.name}
             
              \`Veuillez patienter\``)
          .setTimestamp()
          .setFooter({ text: "help" })
        await message.followUp({ embeds: [botEmbed] }).then(async () => {

          let Embed1 = new Discord.EmbedBuilder()
            .setColor("#0070FF")
            .setThumbnail(bot.user.displayAvatarURL({ dynamic: true }))
            .setDescription(`${infoE} **__Bienvenue sur la commande help__**

                    > Commands disponibles : \`${bot.commands.size}\`
                    > Catégories disponibles : \`${categories.length}\``)
            .setTimestamp()
            .setFooter({ text: "Commandes du bot" })

          setTimeout(async () => await message.editReply({ embeds: [Embed1], components: [row] }), 2000)
        })
      }

    } catch (err) {
      console.log(`
      >------------ OUPS UNE ERREUR ------------<
      
      UNE ERREUR DANS LA COMMANDE HELP !!

      >--------------- L'ERREUR ----------------<

      ${err}
      
      >-----------------------------------------<
      `)
      fs.writeFile("./erreur.txt", `${err.stack}`, () => { return })
      let channel = await bot.channels.cache.get("1041816985920610354")
      channel.send({ content: `⚠️ UNE ERREUR DANS LA COMMANDE HELP !!`, files: [{ attachment: './erreur.txt', name: 'erreur.txt', description: "L'erreur obtenue" }] })
    }
  }
}
