const Discord = require("discord.js");

module.exports = {

    name: "unwarn",
    description: "Permet de supprimer un warn d'un membre.",
    permission: Discord.PermissionFlagsBits.ModerateMembers,
    dm: false,
    category: `🧑🏻‍⚖️Modération`,
    options: [{
        type: "user",
        name: "membre",
        description: "Le membre à unwarn.",
        required: true,
        autocomplete: false
    },
    {
        type: "string",
        name: "unwarn",
        description: "Permet de mettre l'Id du warn que l'on obtient avec le /warnlist.",
        required: true,
        autocomplete: false
    },
    ],

    async run(bot, message, args, db) {

        let user = args.getUser("membre")
        if (!user) return message.channel.send("Pas de membre !"), message.reply({ content: '🔴 ** erreur envoyé avec succès ! **🔴', ephemeral: true })
        let member = message.guild.members.cache.get(user.id)
        if (!member) return message.channel.send("Pas de membre !"), message.reply({ content: '🔴 ** erreur envoyé avec succès ! **🔴', ephemeral: true })

        db.query(`SELECT * FROM warns WHERE guildId = '${message.guildId}' AND userId = '${user.id}'`, async (err, req) => {
            let warns = args.getString("unwarn") || req[0].warn
            if (!warns) return message.channel.send("Pas de warn !"), message.reply({ content: '🔴 ** erreur envoyé avec succès ! **🔴', ephemeral: true })

            await req.sort((a, b) => parseInt(a.date) - parseInt(b.date))
            if (req.length < 1) return message.channel.send("Ce membre n'a pas de warn !"), message.reply({ content: '🔴 ** erreur envoyé avec succès ! **🔴', ephemeral: true })

            try {
                try {

                    let unwarnEmbed = new Discord.EmbedBuilder()
                        .setColor("#FF0000")
                        .setTitle(`Unwarn par ${message.user.tag}.`)
                        .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
                        .setDescription(`🛑 **__UnWarn__**
                
                > **Serveur :** \`${message.guild.name}\`
                > **Modérateur :** \`${message.user.tag}\`!`)
                        .setTimestamp()
                        .setFooter({ text: "Unwarn" })

                    await user.send({ embeds: [unwarnEmbed] })

                } catch (err) { }

                let unwarnEmbed = new Discord.EmbedBuilder()
                    .setColor("#FF0000")
                    .setTitle(`le membre ${user.tag} a étais unwarn.`)
                    .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
                    .setDescription(`🛑 **__UnWarn__** \
            
            > **Modérateur :** \`${message.user.tag}\` a unwarn le membre  **avec succès ! ✅**
            > **Membre :** \`${user.tag}\`!`)
                    .setTimestamp()
                    .setFooter({ text: "Unwarn" })

                await message.reply({ embeds: [unwarnEmbed] })
                db.query(`DELETE FROM warns WHERE guildId = '${message.guildId}' AND warn = '${warns}'`)
            } catch (err) {

                console.log(`Une erreur dans la commande unwarn.`, err)

            }
        })
    }
}