const Discord = require("discord.js");

module.exports = {

    name: "unlock",
    description: "Permet de déverouiller un salon.",
    permission: Discord.PermissionFlagsBits.ModerateMembers,
    dm: false,
    category: "🧑🏻‍⚖️Modération",

    async run(bot, message, args, db) {

        try {

            message.channel.permissionOverwrites.edit(message.guild.roles.cache.find(e => e.name.toLowerCase().trim() == "@everyone"), {
                "SendMessages": true,
                "AddReactions": true,
                "SendTTSMessages": true,
                "AttachFiles": true,
                "CreatePublicThreads": true,
                "CreatePrivateThreads": true,
                "SendMessagesInThreads": true,
            });

            return message.reply({ content: `Je viens de déverouiller le salon.`, ephemeral: true })

        } catch (err) {

            console.log(`Une erreur dans la commande unlock`, err);
        }

    }
}