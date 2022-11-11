const Discord = require("discord.js")

module.exports = {

    name: "warn",
    description: "Pour warn un membre sur le serveur.",
    permission: Discord.PermissionFlagsBits.ModerateMembers,
    dm: false,
    category: "🧑🏻‍⚖️Modération",
    options: [
        {
            type: "user",
            name: "membre",
            description: "Le membre a warn.",
            required: true,
            autocomplete: false

        }, {
            type: "string",
            name: "raison",
            description: "La raison du warn.",
            required: true,
            autocomplete: false

        }
    ],

    async run(bot, message, args, db) {

        let user = args.getUser("membre")
        if (!user) return message.channel.send("Le membre n'a pas été trouvé !"), message.reply({ content: '🔴 ** erreur envoyé avec succès ! **🔴', ephemeral: true })
        let member = message.guild.members.cache.get(user.id)
        if (!member) return message.channel.send("Le membre n'a pas été trouvé !"), message.reply({ content: '🔴 ** erreur envoyé avec succès ! **🔴', ephemeral: true })

        let reason = args.getString("raison")
        if (!reason) reason = "Veuillez noter la raison du warn.";

        if (message.user.id === user.id) return message.channel.send("Tu ne peux pas te warn toi-même !"), message.reply({ content: '🔴 ** erreur envoyé avec succès ! **🔴', ephemeral: true })
        if ((await message.guild.fetchOwner()).id === user.id) return message.channel.send("Tu ne peux pas warn le propriétaire du serveur !"), message.reply({ content: '🔴 ** erreur envoyé avec succès ! **🔴', ephemeral: true })
        if (member && message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.channel.send("Tu ne peux pas warn ce membre !")
        if ((await message.guild.members.fetchMe()).roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.channel.send("Tu ne peux pas warn ce membre !"), message.reply({ content: '🔴 ** erreur envoyé avec succès ! **🔴', ephemeral: true })

        try {
            try {
                let warnEmbed = new Discord.EmbedBuilder()
                    .setColor("#FF0000")
                    .setTitle(`Warn par ${message.user.tag}.`)
                    .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
                    .setDescription(`🛑 **__Avertissement__**
                
                > **Serveur :** \`${message.guild.name}$\`
                > **Modérateur :** \`${message.user.tag}\` 
                > **Raison ** : \`${reason}\`!`)
                    .setTimestamp()
                    .setFooter({ text: "Warn" })
                await user.send({ embeds: [warnEmbed] })

            } catch (err) { }

            let warnEmbed = new Discord.EmbedBuilder()
                .setColor("#FF0000")
                .setTitle(`le membre ${user.tag} a étais warn.`)
                .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
                .setDescription(`🛑 **__Avertissement__** \
            
            > **Modérateur :** \`${message.user.tag}\` a **averti avec succès ! ✅**
            > **Raison :** \`${reason}\!`)
                .setTimestamp()
                .setFooter({ text: "Warn" })

            await message.reply({ embeds: [warnEmbed] })

            let ID = await bot.fonction.createId("WARN")
            db.query(`INSERT INTO warns (guild, guildId, user, userId, author, authorId, warn, reason, date) VALUES ('${message.guild.name}', '${message.guild.id}','${user.tag}', '${user.id}','${message.user.tag}','${message.user.id}', '${ID}', '${reason.replace(/'/g, "\\'")}', '${Date.now()}')`)

        } catch (err) {

            console.log(`Une erreur dans la commande warn.`, err)

        }
    }
} 