const Discord = require("discord.js")
const fs = require("fs");
const ms = require("ms")

module.exports = {

    name: "mute",
    description: "Permet de mute un membre sur le serveur.",
    permission: Discord.PermissionFlagsBits.ModerateMembers,
    dm: false,
    category: "🧑🏻‍⚖️Modération",
    options: [
        {
            type: "user",
            name: "membre",
            description: "Quel est le membre à mute ?",
            required: true,
            autocomplete: false

        }, {
            type: "string",
            name: "temps",
            description: "Quel est le temps du mute ?",
            required: true,
            autocomplete: false
        }, {
            type: "string",
            name: "raison",
            description: "Quel est la raison du mute ?",
            required: true,
            autocomplete: false
        }
    ],
    async run(bot, message, args, db) {


        let user = args.getUser("membre");
        if (!user) return message.reply({ content: "Pas de membre à mute !!", ephemeral: true })
        let member = message.guild.members.cache.get(user.id)
        if (!member) return message.reply({ content: "Pas de membre !!", ephemeral: true })

        let time = args.getString("temps")
        if (!time) return message.reply({ content: "Pas de temps !!", ephemeral: true })
        if (isNaN(ms(time))) return message.reply({ content: "Pas le bon format !!", ephemeral: true })
        if (ms(time) > 2419200000) return message.reply({ content: "Le mute ne peux pas dures plus de 28 jours !!", ephemeral: true })

        let reason = args.getString("raison")
        if (!reason) reason = "Pas de raison fournie !!";

        if (message.user.id === user.id) return message.reply({ content: "Essaie pas de te mute !!", ephemeral: true })
        if ((await message.guild.fetchOwner()).id === user.id) return message.reply({ content: "Ne mute pas le propriétaire du serveur !!", ephemeral: true })
        if (!member.moderatable) return message.reply("Je ne peux pas mute ce membre !!")
        if (message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply({ content: "Tu ne peux pas mute cette personne !!", ephemeral: true })
        if (member.isCommunicationDisabled()) return message.reply({ content: "Ce membre est déja mute !!", ephemeral: true })

        try {
            try {
                let muteEmbed = new Discord.EmbedBuilder()
                    .setColor("#FF0000")
                    .setTitle(`Mute par ${message.user.tag}`)
                    .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
                    .setDescription(`🛑 **__Mute__** 
                
                > **Serveur :**\`${message.guild.name}\`
                > **Time :**\`${time}\`
                > **Modérateur :**\`${message.user.tag}\`
                > **Raison :** \`${reason}\`!`)
                    .setTimestamp()
                    .setFooter({ text: "Mute" })
                await user.send({ embeds: [muteEmbed] })
            } catch (err) { }

            let muteEmbed = new Discord.EmbedBuilder()
                .setColor("#FF0000")
                .setTitle(`Le membre ${user.tag} a étais mute`)
                .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
                .setDescription(`🛑 **__Mute__** 

            > **Modérateur :** \`${message.user.tag}\`
            > **Membre qui est kick :** \`${user.tag}\`
            > **Time :**\`${time}\`
            > **Raison :** \`${reason}\`!`)
                .setTimestamp()
                .setFooter({ text: "Mute" })

            await message.reply({ embeds: [muteEmbed] })
            await member.timeout(ms(time), reason)

            let ID = await bot.fonction.createId("MUTE")

            db.query(`INSERT INTO mutes (guild, guildId, user, userId, author, authorId, mute, time, reason, date) VALUES ('${message.guild.name}', '${message.guild.id}','${user.tag}', '${user.id}','${message.user.tag}','${message.user.id}', '${ID}', '${time}', '${reason.replace(/'/g, "\\'")}', '${Date.now()}')`)

        } catch (err) {

            console.log(`Une erreur dans la commande mute`, err)
            fs.writeFile("./erreur.txt", `${err.stack} `, () => {
                return
            })

            let channel = await bot.channels.cache.get("1038859689833791528")
            channel.send({ content: `⚠️ Une erreur est apparue! Sur le  ${message.guild.name} !`, files: [{ attachment: './erreur.txt', name: 'erreur.txt', description: "L'erreur obtenue" }] })
        }
    }
}
