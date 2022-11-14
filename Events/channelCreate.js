const Discord = require('discord.js');
const fs = require('fs');

module.exports = async (bot, channels) => {

  let db = bot.db;

  try {

    db.query(`SELECT logs FROM server WHERE guild = '${channels.guild.id}'`, async (err, req) => {
      const fetchAuditLogs = await channels.guild.fetchAuditLogs({
        type: Discord.AuditLogEvent.ChannelCreate,
        limit: 1
      })

      if (req[0].logs === "false") return

      let channel = channels.guild.channels.cache.get(req[0].logs);

      const LatestChannel = fetchAuditLogs.entries.first()

      let Embed = new Discord.EmbedBuilder()
        .setColor("#FFD6EF")
        .setTitle("Création d'un salon")
        .setThumbnail(bot.user.displayAvatarURL({ dynamic: true }))
        .setDescription(`

                > **Salon :** ${channels.name}
                > **Auteur :** ${LatestChannel.executor.tag}`)
        .setFooter({ text: "channelCreate" })
        .setTimestamp()

      channel.send({ embeds: [Embed] });

    })

  } catch (err) {

    console.log("Une erreur dans l'event channelCreate pour la création du salon de log.", err)

    fs.writeFile("./erreur.txt", `${err.stack}`, () => {
      return
    })

    let channel = await bot.channels.cache.get("1041816985920610354")
    channel.send({ content: `⚠️ Une erreur est apparue ! Sur le  ${message.guild.name} !`, files: [{ attachment: './erreur.txt', name: 'erreur.txt', description: "L'erreur obtenue" }] })


  }
}




