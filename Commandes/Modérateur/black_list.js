const Discord = require("discord.js")
const fs = require("fs");

module.exports = {

    name: "black_list",
    description: "Affiche les membres blacklist.",
    permission: Discord.PermissionFlagsBits.ModerateMembers,
    dm: false,
    category: "🧑🏻‍⚖️Modération",

    async run(bot, message, args, db) {

        try {
            db.query(`SELECT * FROM blacklists WHERE guildId = '${message.guildId}'`, async (err, req) => {
                let embed_description = ""
                let Embed = new Discord.EmbedBuilder()
                    .setColor("#FF0000")
                    .setTitle(`Liste des blacklists des membres`)
                    .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
                    .setTimestamp()
                    .setFooter({ text: "Blacklist" })

                for (let i = 0; i < req.length; i++) {
                    embed_description = embed_description + `

                    > **Serveur :** \`${req[i].guild}\`
                    > **Membre :** \`${req[i].usertag} \`
                    > **Pseudo dans le jeux :** \`${req[i].pseudo}\`
                    > **Jeux :** \`${req[i].jeux}\`
                    > **Raison :** \`${req[i].reason}\``
                }

                if (embed_description === "") {
                    embed_description = "La blackliste est vide !"
                }

                Embed.setDescription(embed_description)
                await message.reply({ embeds: [Embed] })
            })
        } catch (err) {

            console.log(`Une erreur dans la commande blacklist.`, err)

            fs.writeFile("./erreur.txt", `${err.stack}`, () => {
                return
            })

            let channel = await bot.channels.cache.get("1038859689833791528")
            channel.send({ content: `⚠️ Une erreur est apparue ! Sur le  ${message.guild.name} !`, files: [{ attachment: './erreur.txt', name: 'erreur.txt', description: "L'erreur obtenue" }] })
        }
    }
}