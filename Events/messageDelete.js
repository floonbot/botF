const Discord = require('discord.js');

module.exports = async (bot, message) => {

    let db = bot.db;

    db.query(`SELECT logs FROM server WHERE guild = '${message.guildId}'`, async (err, req) => {

        try {

            if (message.author.bot) return;
            if (req[0].logs === "false") return;
            else {

                let channel = message.guild.channels.cache.get(req[0].logs);
                if (!channel) return;

                const AuditsLogs = await message.guild.fetchAuditLogs({
                    type: Discord.AuditLogEvent.MessageDelete,
                    limit: 1
                })

                const LatestMessageDeleted = AuditsLogs.entries.first();

                let Embed = new Discord.EmbedBuilder()
                    .setColor("#490005")
                    .setTitle("Message supprimé.")
                    .setThumbnail(bot.user.displayAvatarURL({ dynamic: true }))
                    .setDescription(`Auteur du message : ${message.author}\nAuteur de la suppresion : ${LatestMessageDeleted.executor}\nDate de création du message : <t:${Math.floor(message.createdAt / 1000)}:F>\nContenu : \`\`\`${message.content}\`\`\``)
                    .setFooter({ text: "Ton footer", iconURL: bot.user.displayAvatarURL({ dynamic: true }) })
                    .setTimestamp()

                channel.send({ embeds: [Embed] });
            }

        } catch (err) {

            console.log("Une erreur dans l'event messageDelete pour les logs du captcha.", err)

        }
    })
}