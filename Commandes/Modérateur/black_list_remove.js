const Discord = require("discord.js");
const fs = require("fs");

module.exports = {

    name: "black_list_remove",
    description: "Supprime un joueur de la blacklist.",
    permission: Discord.PermissionFlagsBits.ModerateMembers,
    dm: false,
    category: "🧑🏻‍⚖️Modération",
    options: [
        {
            type: "user",
            name: "membre",
            description: "Membre à unblacklister.",
            required: true
        },
    ],

    async run(bot, message, args, db) {

        let user = args.getUser("membre")
        if (!user) return message.reply({ content: "Pas de membre !!", ephemeral: true })
        let member = message.guild.members.cache.get(user.id)
        if (!member) return message.reply({ content: "Pas de membre !!", ephemeral: true })

        try {

            db.query(`SELECT * FROM blacklists WHERE guildId = '${message.guildId}' AND user = '${user.id}'`, async (err, req) => {

                await req.sort((a, b) => parseInt(a.date) - parseInt(b.date))
                if (req.length <= 0) return message.reply({ content: "Cette personne n'est pas blacklister !!", ephemeral: true })

                db.query(`DELETE FROM blacklists WHERE guildId = '${message.guildId}' AND user = '${user.id}'`)

                let Embed = new Discord.EmbedBuilder()
                    .setColor("#FF0000")
                    .setTitle(`Le membre ${user.tag} est bien supprimé de la black list`)
                    .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
                    .setDescription(`🛑 **__Black list__** 
             
            > **Serveur :**  \`${message.guild.name}\`
            > **Modérateur :** \`${message.user.tag}\`
            > **Membre qui est supprimé de la black list :** \`${user.tag}\``)
                    .setTimestamp()
                    .setFooter({ text: "Black list" })

                await message.reply({ embeds: [Embed] })

                const removeRole = member.guild.roles.cache.find(r => r.name === "Black list")
                member.roles.remove(removeRole)
            })
        } catch (err) {

            console.log(`Une erreur dans la commande blacklistremove`, err)

            fs.writeFile("./erreur.txt", `${err.stack}`, () => {
                return
            })

            let channel = await bot.channels.cache.get("1038859689833791528")
            channel.send({ content: `⚠️ Une erreur est apparue ! Sur le  ${message.guild.name} !`, files: [{ attachment: './erreur.txt', name: 'erreur.txt', description: "L'erreur obtenue" }] })
        }
    }
}