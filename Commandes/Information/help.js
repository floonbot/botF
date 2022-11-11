const Discord = require("discord.js");
const { Sos } = require("../../emoji.json");

module.exports = {

    name: "help",
    description: "Donne les commands du bot",
    permission: "Aucune",
    dm: false,
    category: "👆🏻Information",


    async run(bot, message) {

        let command;

        try {
            if (!command) {

                let categories = [];
                bot.commands.forEach(command => {
                    if (!categories.includes(command.category)) categories.push(command.category)
                })

                let Embed = new Discord.EmbedBuilder()
                    .setColor("#0070FF")
                    .setTitle(`${Sos}Commandes du bot${Sos}`)
                    .setThumbnail(bot.user.displayAvatarURL({ dynamic: true }))
                    .setDescription(`Commands disponibles : \`${bot.commands.size}\`\nCatégories disponibles : \`${categories.length}\``)
                    .setTimestamp()
                    .setFooter({ text: "Commandes du bot" })

                await categories.sort().forEach(async cat => {

                    let commands = bot.commands.filter(cmd => cmd.category === cat)
                    Embed.addFields({ name: `${cat}`, value: `${commands.map(cmd => `\`${cmd.name}\` : ${cmd.description}`).join("\n")}` })
                })

                await message.reply({ embeds: [Embed] })

            }

        } catch (err) {
            console.log("Une erreur dans la commande help", err)
        }

    }
}
