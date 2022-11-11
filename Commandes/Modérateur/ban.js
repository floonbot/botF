const Discord = require("discord.js");
const fs = require("fs");

module.exports = {

    name: "ban",
    description: "Pour Ban le membre qui à fait l'infractions.",
    permission: Discord.PermissionFlagsBits.ModerateMembers,
    dm: false,
    category: "🧑🏻‍⚖️Modération",
    options: [
        {
            type: "user",
            name: "membre",
            description: "Le membre à bannir.",
            required: true,
            autocomplete: false
        }, {
            type: "string",
            name: "raison",
            description: "La raison du bannissement.",
            required: true,
            autocomplete: false
        }
    ],
    async run(bot, message, args, db) {

        try {

            let user = await bot.users.fetch(args._hoistedOptions[0].value)
            if (!user) return message.reply({ content: "Pas de membre à bannir !!", ephemeral: true })

            let reason = args.get("raison").value;
            if (!reason) reason = "Pas de raison fournie pour ban le membre !!";

            if (message.user.id === user.id) return message.reply({ content: "Essaie pas de te bannir !!", ephemeral: true })
            if ((await message.guild.fetchOwner()).id === user.id) return message.reply({ content: "Ne ban pas le propriétaire du serveur !!", ephemeral: true })
            if (member && !member.bannable) return message.reply({ content: "Je ne peux pas bannir ce membre !!", ephemeral: true })
            if (member && message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply({ content: "Tu ne peux pas bannir cette personne !!", ephemeral: true })
            if ((await message.guild.bans.fetch()).get(user.id)) return message.reply({ content: "Ce membre est déja ban !!", ephemeral: true })

            try {

                let Embed = new Discord.EmbedBuilder()
                    .setColor("#FF0000")
                    .setTitle(`Ban par ${message.user.tag}.`)
                    .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
                    .setDescription(`🛑 **__Ban__**
                    
                    > **Serveur :** \`${message.guild.name}\`,
                    > **Modérateur :** \`${message.user.tag} \`,
                    > **Raison :** \`${reason}\`!`)
                    .setTimestamp()
                    .setFooter({ text: "Ban" })

                await user.send({ embeds: [Embed] })

            } catch (err) {

                console.log("Je n'est pas envoyer le message en dm car le membre à les mp fermé !!")

            }

            let Embed = new Discord.EmbedBuilder()
                .setColor("#FF0000")
                .setTitle(`Le membre ${user.tag} a étais ban`)
                .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
                .setDescription(`🛑 **__Ban__** 
                
                > **Modérateur :** \`${message.user.tag}\`
                > **Membre qui est ban :** \`${user.tag}\`
                > **Raison :** \`${reason}\``)
                .setTimestamp()
                .setFooter({ text: "Ban" })

            await message.reply({ embeds: [Embed] })
            await message.guild.bans.create(user.id, { reason: reason })

            let ID = await bot.fonction.createId("BAN")

            db.query(`INSERT INTO bans (guild, guildId, user, userId, author, authorId, ban, reason, date) VALUES ('${message.guild.name}', '${message.guild.id}','${user.tag}', '${user.id}','${message.user.tag}','${message.user.id}', '${ID}', '${reason.replace(/'/g, "\\'")}', '${Date.now()}')`)

        } catch (err) {

            console.log(`Une erreur dans la commande ban.`, err)

            fs.writeFile("./erreur.txt", `${err.stack}`, () => {
                return
            })

            let channel = await bot.channels.cache.get("1038859689833791528")
            channel.send({ content: `⚠️ Une erreur est apparue ! Sur le  ${message.guild.name} !`, files: [{ attachment: './erreur.txt', name: 'erreur.txt', description: "L'erreur obtenue" }] })
        }
    }
}