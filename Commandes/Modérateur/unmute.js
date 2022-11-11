const Discord = require("discord.js")
const ms = require("ms")

module.exports = {

    name: "unmute",
    description: "Permet d'enlever le mute d'un membre.",
    permission: Discord.PermissionFlagsBits.ModerateMembers,
    dm: false,
    category: "🧑🏻‍⚖️Modération",
    options: [
        {
            type: "user",
            name: "membre",
            description: "Le membre à unmute.",
            required: true,
            autocomplete: false
        }, {
            type: "string",
            name: "raison",
            description: "La raison du unmute.",
            required: true,
            autocomplete: false
        }
    ],
    async run(bot, message, args) {

        let user = args.getUser("membre");
        if (!user) return message.channel.send("Pas de membre à unmute !"), message.reply({ content: '🔴 ** erreur envoyé avec succès ! **🔴', ephemeral: true })
        let member = message.guild.members.cache.get(user.id)
        if (!member) return message.channel.send("Pas de membre !"), message.reply({ content: '🔴 ** erreur envoyé avec succès ! **🔴', ephemeral: true })

        let reason = args.getString("raison")
        if (!reason) reason = "Pas de raison fournie !";

        if (!member.moderatable) return message.reply("Je ne peux pas unmute ce membre !")
        if (message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply("Tu ne peux pas umute cette personne")
        if (!member.isCommunicationDisabled()) return message.reply("Ce membre est pas mute !")

        try {
            try {
                let unMuteEmbed = new Discord.EmbedBuilder()
                    .setColor("#FF0000")
                    .setTitle(`Unmute par ${message.user.tag}`)
                    .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
                    .setDescription(`🛑 **__Unmute__**
                
                > **Serveur :**\`${message.guild.name}\`
                > **Modérateur :**\`${message.user.tag}\`\n 
                > **Raison :** \`${reason}\``)
                    .setTimestamp()
                    .setFooter({ text: "Unmute" })
                await user.send({ embeds: [unMuteEmbed] })

            } catch (err) { }

            let unMuteEmbed = new Discord.EmbedBuilder()
                .setColor("#FF0000")
                .setTitle(`Le memmbre a étais Unmute par ${message.user.tag}`)
                .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
                .setDescription(`🛑 **__Unmute__** 
            > **Modérateur :**\`${message.user.tag}\` a unmute **avec succès ! ✅**
            > **Membre :** \`${user.tag}\` 
            > **Raison :** \`${reason}\``)
                .setTimestamp()
                .setFooter({ text: "Unmute" })

            await message.reply({ embeds: [unMuteEmbed] })
            await member.timeout(null, reason)

        } catch (err) {

            console.log(`Une erreur dans la commande unmute`, err)

        }
    }
}
