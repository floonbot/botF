const Discord = require('discord.js');
const fs = require('fs');

module.exports = async (bot, message) => {

  let db = bot.db;

  db.query(`SELECT logs FROM server WHERE guild = '${message.guild.id}'`, async (err, req) => {

    try {

      if (req[0].logs === "false") return;

      let channel = message.guild.channels.cache.get(req[0].logs);
      if (!channel) return;

      const AuditsLogs = await message.guild.fetchAuditLogs({
        type: Discord.AuditLogEvent.InviteDelete,
        limit: 1
      })

      const LatestMessageDeleted = AuditsLogs.entries.first();

      let Embed = new Discord.EmbedBuilder()
        .setColor("#FFD6EF")
        .setTitle("InviteDelete")
        .setThumbnail(bot.user.displayAvatarURL({ dynamic: true }))
        .setDescription(`
                
                > **Auteur :** ${LatestMessageDeleted.executor.tag}
                > **Date  :** <t:${Math.floor(message.createdAt / 1000)}:F>`)

        .setFooter({ text: "inviteDelete" })
        .setTimestamp()
      channel.send({ embeds: [Embed] });

    } catch (err) {
      console.log(`
      >------------ OUPS UNE ERREUR ------------<
      
      UNE ERREUR DANS L'EVENT INVITEDELETE !!
  
      >--------------- L'ERREUR ----------------<
  
      ${err}
      
      >-----------------------------------------<
      `)
      fs.writeFile("./erreur.txt", `${err.stack}`, () => { return })
      let channel = await bot.channels.cache.get("1041816985920610354")
      channel.send({ content: `⚠️ UNE ERREUR DANS L'EVENT INVITEDELETE !!`, files: [{ attachment: './erreur.txt', name: 'erreur.txt', description: "L'erreur obtenue" }] })
    }
  })
}