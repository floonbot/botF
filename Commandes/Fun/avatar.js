const Discord = require('discord.js');
const fs = require("fs");
const { avatar} = require("../../emoji.json");
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {

    name: "avatar",
    description: "Permet de récupérer l'avatar d'un membre",
    permission: "Aucune",
    dm: false,
    category: "🥳Fun",
    options: [
        {
            type: "user",
            name: "utlisateur",
            description: "Quel est l'avatar ?",
            required: true,
            autocomplete: false
        }
    ],

    async run(bot, message, args) {

        try {
            let user = args.getUser(`utlisateur`)
            if (!user) return message.reply("Utlisateur non valide ou mal définie !")

            await message.deferReply()

            let row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setLabel(`Avatar`)
                        .setURL(`${user.displayAvatarURL({ dynamic: true })}`)
                        .setStyle(ButtonStyle.Link)
                )

            let avatarEmbed = new Discord.EmbedBuilder()
                .setColor("#FF5D00")
                .setTitle(`Chargement de la commande avatar !!`)
                .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
                .setDescription(`${avatar} **__Je cherche l'avatar du membre__** ${avatar}
                
                > **Sur le serveur :** ${message.guild.name}

                \`Veuillez patienter\``)
                .setTimestamp()
                .setFooter({ text: "Avatar" })

            await message.followUp({ embeds: [avatarEmbed] }).then(() => {


                avatarEmbed = new EmbedBuilder()
                    .setAuthor({ name: `Avatar du membre ${user.tag}.`, iconURL: (user.displayAvatarURL({ dynamic: true })) })
                    .setColor("#00A705")
                    .setTimestamp()
                    .setFooter({ text: `Avatar du membre ${user.tag}.` })
                    .setImage(user.displayAvatarURL({ dynamic: true, size: 128 }))

                setTimeout(() => message.editReply({ embeds: [avatarEmbed], components: [row] }), 2000);

            })
        } catch (err) {

            console.log('Une erreur dans la commande avatar.', err)

            fs.writeFile("./erreur.txt", `${err.stack}`, () => {
                return
            })

            let channel = await bot.channels.cache.get("1038859689833791528")
            channel.send({ content: `⚠️ Une erreur est apparue ! Sur le  ${message.guild.name} !`, files: [{ attachment: './erreur.txt', name: 'erreur.txt', description: "L'erreur obtenue" }] })
        }

    }

}