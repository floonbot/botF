const Discord = require("discord.js");
const fs = require("fs");
const { serveurE, modoE, textE, userE, banE} = require("../.././json/emoji.json")

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
            description: "Quel est le membre ?",
            required: true,
            autocomplete: false

        }, {
            type: "string",
            name: "raison",
            description: "Quel est le raison ?",
            required: true,
            autocomplete: false

        }
    ],

    async run(bot, message, args) {

        try {
            let user = args.getUser("membre");
            if (!user) return message.reply("Pas de membre à unban !!")

            let reason = args.get("raison").value;
            if (!reason) reason = "Pas de raison fournie !!";

            if (!(await message.guild.bans.fetch()).get(user.id)) return message.reply("ce membre est pas ban"), message.reply({ content: '🔴 ** erreur envoyé avec succès ! **🔴', ephemeral: true })

            try {
                let Embed1 = new Discord.EmbedBuilder()
                    .setColor("#FF0000")
                    .setTitle(`Unban par ${message.user.tag}`)
                    .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
                    .setDescription(`${banE} **__UnBan__**
                    
                    > ${serveurE} **Serveur :**\`${message.guild.name}\`
                    > ${modoE} **Modérateur :**\`${message.user.tag}\`
                    > ${textE} **Raison :** \`${reason}\``)
                    .setTimestamp()
                    .setFooter({ text: "Unban" })
                await user.send({ embeds: [Embed1] })

            } catch (err) { }

            await message.deferReply()

            let Embed = new Discord.EmbedBuilder()
            .setColor("#FF5D00")
            .setTitle(`Chargement de la commande unban !!`)
            .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
            .setDescription(`${banE}**__Je suis entraind de unban__**${banE}

            > **Sur le serveur :** ${message.guild.name}, 
            
            \`veuillez patienter\`.`)
            .setTimestamp()
            .setFooter({ text: "Unban" })

        await message.followUp({ embeds: [Embed] }).then(() => {

            let Embed = new Discord.EmbedBuilder()
                .setColor("#FF0000")
                .setTitle(`Le membre a étais Unban`)
                .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
                .setDescription(`${banE} **__UnBan__*
                
                > ${modoE} **Modérateur :** \`${message.user.tag}\` a unban **avec succès ! ✅**
                > ${userE} **Membre :** \`${user.tag}\ 
                > ${textE} **Raison : \`${reason}\``)
                .setTimestamp()
                .setFooter({ text: "Unban" })

           setTimeout(async() => await message.channel.editReply({ embeds: [Embed] }), 2000)
        })
            await message.guild.members.unban(user, reason)


        } catch (err) {

            console.log('Une erreur sur la commande unban', err)

            fs.writeFile("./erreur.txt", `${err.stack}`, () => {
                return
            })

            let channel = await bot.channels.cache.get("1038859689833791528")
            channel.send({ content: `⚠️ Une erreur est apparue ! Sur le  ${message.guild.name} !`, files: [{ attachment: './erreur.txt', name: 'erreur.txt', description: "L'erreur obtenue" }] })
        }
    }
}