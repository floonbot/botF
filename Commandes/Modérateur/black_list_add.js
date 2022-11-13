const Discord = require('discord.js')
const fs = require("fs");

module.exports = {

    name: "black_list_add",
    description: "Ajoute un joueur à la blacklist",
    permission: Discord.PermissionFlagsBits.ModerateMembers,
    dm: false,
    category: "🧑🏻‍⚖️Modération",
    options: [
        {
            type: "user",
            name: "membre",
            description: "membre à blacklister.",
            required: true
        },
        {
            type: "string",
            name: "id",
            description: "id discord du membre à blacklister.",
            required: true,
            autocomplete: false
        },
        {
            type: "string",
            name: "pseudo",
            description: "pseudo dans le jeu où le membre vas être blacklist.",
            required: false,
            autocomplete: false
        }, {
            type: "string",
            name: "raison",
            description: "la raison du blacklist.",
            required: false,
            autocomplete: false
        }, {
            type: "string",
            name: "jeux",
            description: "Le jeu sur le quel le membre est blacklist.",
            required: false,
            autocomplete: false
        }
    ],

    async run(bot, message, args, db) {

        try {

            let user = args.getUser("membre")
            if (!user) return message.reply({ content: "Pas de membre à blacklister !!", ephemeral: true })
            let member = message.guild.members.cache.get(user.id)
            if (!member) return message.reply({ content: "Pas de membre à blacklister !!", ephemeral: true })

            let pseudo = args.getString("pseudo")
            if (!pseudo) pseudo = "Pas de pseudo"

            let jeux = args.getString("jeu")
            if (!jeux) jeux = "Pas de jeux"

            let reason = args.getString("raison")
            if (!reason) reason = "Aucune raison donnée";

            if (message.user.id === user.id) return message.reply({ content: "N'essayes pas de te blacklister !!", ephemeral: true })
            if ((await message.guild.fetchOwner()).id === user.id) return message.reply({ content: "Ne blacklist pas le propriétaire du serveur !!", ephemeral: true })
            if (message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply({ content: "Tu ne peux pas blacklister cette personne !!", ephemeral: true })
            if ((await message.guild.members.fetchMe()).roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply("Le bot ne peut pas blacklister cette personne !!")

            let Embed = new Discord.EmbedBuilder()
                .setColor("#FF0000")
                .setTitle(`Le membre ${user.tag} est bien dans la black list`)
                .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
                .setDescription(`🛑 **__Black list__** 
            
            > **Modérateur :** \`${message.user.tag}\`
            > **Membre qui est black list :** \`${user.tag}\`
            > **Raison :** \`${reason}\``)
                .setTimestamp()
                .setFooter({ text: "Black list" })

            await message.reply({ embeds: [Embed] })

            const addRole = member.guild.roles.cache.find(r => r.name === "Black list")
            if (!addRole) {
                const addRole = await member.guild.roles.create({
                    name: 'Black list', color: "DarkGold"
                });
                await member.roles.add(addRole);
            } else {
                member.roles.add(addRole)
            }

            let ID = await bot.fonction.createId("BLACKLIST")
            db.query(`INSERT INTO blacklists (guildId, guild, user, usertag, pseudo, jeux, author, blacklist, reason) VALUES ('${message.guild.id}', '${message.guild.name}', '${user.id}', '${user.tag}', '${pseudo}', '${jeux}', '${message.user.tag}', '${ID}', '${reason.replace(/'/g, "\\'")}')`)

        } catch (err) {

            console.log(`Une erreur dans la commande blacklistadd`, err)

            fs.writeFile("./erreur.txt", `${err.stack}`, () => {
                return
            })

            let channel = await bot.channels.cache.get("1038859689833791528")
            channel.send({ content: `⚠️ Une erreur est apparue ! Sur le  ${message.guild.name} !`, files: [{ attachment: './erreur.txt', name: 'erreur.txt', description: "L'erreur obtenue" }] })
        }

    }

}

