const Discord = require("discord.js")
const fs = require("fs")

module.exports = {

    name: "unban",
    description: "unBan un membre",
    permission: Discord.PermissionFlagsBits.ModerateMembers,
    dm: false,
    category: "🧑🏻‍⚖️Modération",
    options: [
        {
            type: "user",
            name: "membre",
            description: "Le membre à unban.",
            required: true,
            autocomplete: false

        }, {
            type: "string",
            name: "raison",
            description: "La raison du unban.",
            required: true,
            autocomplete: false

        }
    ],

    async run(bot, message, args) {

        try {
            let user = args.getUser("membre");
            if (!user) return message.reply("Pas de membre à unban!")

            let reason = args.get("raison").value;
            if (!reason) reason = "Pas de raison fournie!";

            if (!(await message.guild.bans.fetch()).get(user.id)) return message.reply("ce membre est pas ban"), message.reply({ content: '🔴 ** erreur envoyé avec succès ! **🔴', ephemeral: true })

            try {
                let Embed1 = new Discord.EmbedBuilder()
                    .setColor("#FF0000")
                    .setTitle(`Unban par ${message.user.tag}.`)
                    .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
                    .setDescription(`🛑 **__UnBan__** 
                    
                    > **Serveur :**\`${message.guild.name}\`
                    > **Modérateur :**\`${message.user.tag}\`
                    > **Raison :** \`${reason}\``)
                    .setTimestamp()
                    .setFooter({ text: "Unban" })
                await user.send({ embeds: [Embed1] })

            } catch (err) { }

            let Embed = new Discord.EmbedBuilder()
                .setColor("#FF0000")
                .setTitle(`Le membre ${user.tag} a étais Unban.`)
                .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
                .setDescription(`🛑 **__UnBan__*
                
                > **Moérateur :** \`${message.user.tag}\` a unban **avec succès ! ✅**
                > **Membre :** \`${user.tag}\ 
                > **Raison : \`${reason}\``)
                .setTimestamp()
                .setFooter({ text: "Unban" })

            await message.channel.reply({ embeds: [Embed] })
            await message.guild.members.unban(user, reason)


        } catch (err) {

            return message.reply("Pas de membre à unban", err)

        }
    }
}