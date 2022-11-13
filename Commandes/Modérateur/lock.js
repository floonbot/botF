const Discord = require("discord.js");
const fs = require("fs");

module.exports = {

    name: "unlock",
    description: "Permet de verouiller un salon.",
    permission: Discord.PermissionFlagsBits.ModerateMembers,
    dm: false,
    category: "🧑🏻‍⚖️Modération",

    async run(bot, message) {

        try {

            message.channel.permissionOverwrites.edit(message.guild.roles.cache.find(e => e.name.toLowerCase().trim() == "@everyone"), {
                "SendMessages": false,
                "AddReactions": false,
                "SendTTSMessages": false,
                "AttachFiles": false,
                "CreatePublicThreads": false,
                "CreatePrivateThreads": false,
                "SendMessagesInThreads": false,
            });

            return message.reply({ content: `Je viens de verouiller le salon.`, ephemeral: false })

        } catch (err) {

            console.log(`Une erreur dans la commande lock`, err);

            fs.writeFile("./erreur.txt", `${err.stack} `, () => {
                return
            })

            let channel = await bot.channels.cache.get("1038859689833791528")
            channel.send({ content: `⚠️ Une erreur est apparue! Sur le  ${message.guild.name} !`, files: [{ attachment: './erreur.txt', name: 'erreur.txt', description: "L'erreur obtenue" }] })
        }
    }
}