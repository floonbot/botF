const { EmbedBuilder } = require("discord.js");
const { numStr } = require('../../../fonction')
module.exports = {

    name: 'serverlist',
    description: 'Permet de voit le top5 des serveurs du bot',
    permission: "Aucune",
    dm: false,
    category: "👆🏻Information",

    async run(bot, message) {

        let n = 0
        const guild = bot.guilds.cache.sort((a, b) => b.memberCount - a.memberCount).map((guild) => `**${n += 1}) __${guild.name}__ :**\n\`\`\`${numStr(guild.memberCount)} Membres\n\`\`\``).slice(0, 5).join("\n");

        const embed = new EmbedBuilder()
            .setTitle(`TOP 5 DES SERVEURS`)
            .setDescription(`${guild}`)
            .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
            .setColor("#0070FF")
            .setTimestamp()
            .setFooter({ text: "Serverlist" })

        message.reply({ embeds: [embed] });
    }
}