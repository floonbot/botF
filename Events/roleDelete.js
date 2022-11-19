const Discord = require('discord.js');
const fs = require('fs');

module.exports = async (bot, channels) => {

  let db = bot.db;

  try {

    db.query(`SELECT logs FROM server WHERE guild = '${channels.guild.id}'`, async (err, req) => {
      const fetchAuditLogs = await channels.guild.fetchAuditLogs({
        type: Discord.AuditLogEvent.RoleCreate,
        limit: 1

      })

      if (req[0].logs === "false") return

      let channel = channels.guild.channels.cache.get(req[0].logs);

      const LatestChannel = fetchAuditLogs.entries.first()

      let Embed = new Discord.EmbedBuilder()
        .setColor("#FFD6EF")
        .setTitle("Rôle delete")
        .setThumbnail(bot.user.displayAvatarURL({ dynamic: true }))
        .setDescription(`
                
                > **Auteur :** ${LatestChannel.executor.tag}
                > **Rôle :** ${channels.name}
                > **Date  :** <t:${Math.floor(channels.createdAt / 1000)}:F>\n`)

        .setFooter({ text: "rolDelete" })
        .setTimestamp()
      channel.send({ embeds: [Embed] });
    })

  } catch (err) {
    console.log(`
    >------------ OUPS UNE ERREUR ------------<
    
    UNE ERREUR DANS L'EVENT ROLEDELETE !!

    >--------------- L'ERREUR ----------------<

    ${err}
    
    >-----------------------------------------<
    `)
    fs.writeFile("./erreur.txt", `${err.stack}`, () => { return })
    let channel = await bot.channels.cache.get("1041816985920610354")
    channel.send({ content: `⚠️ UNE ERREUR DANS L'EVENT ROLEDELETE !!`, files: [{ attachment: './erreur.txt', name: 'erreur.txt', description: "L'erreur obtenue" }] })
  }
}




