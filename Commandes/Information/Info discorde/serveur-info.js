const Discord = require("discord.js");
const {  ButtonStyle } = require("discord.js")
const { ChannelType } = require("discord.js")
const { ActionRowBuilder } = require("discord.js")
const { ButtonBuilder } = require("discord.js")

module.exports = {

    name: "serveur-info",
    description: "Permet de voir les Information du serveur",
    dm: false,
    category: "👆🏻Information",

    async run(bot, message, args) {

        await message.deferReply()

        try {

            const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setLabel("Invite moi")
                        .setStyle(ButtonStyle.Link)
                        //Mettre le lien de ton bot
                        .setURL("https://discord.com/api/oauth2/authorize?client_id=1010537525435183166&permissions=8&scope=bot%20applications.commands")
                )

            let serveurEmbed = new Discord.EmbedBuilder()
                .setColor("#FF5D00")
                .setTitle(`Chargement de la commande serveur-info.`)
                .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
                .setDescription(`Les inforamations du servuer  veuillez patienter.`)
                .setTimestamp()
                .setFooter({ text: "server-info" })

            await message.followUp({ embeds: [serveurEmbed] })

            serveurEmbed = new Discord.EmbedBuilder()
                .setTitle("Serveur 👆🏻Information")
                .setColor("#0070FF")
                .setDescription(`
                **__Serveur Informations__**
 
                > Name : \`${message.guild.name}\`
                > ID : \`${message.guild.id}\`
                > Description : pas de description
                > Créateur : <@${message.guild.ownerId}>
                > Boost : ${message.guild.premiumSubscriptionCount}
                > Créer le : ${message.guild.createdAt}
                > Vérification : \`${message.guild.verificationLevel}\`
                > Ping : \`${bot.ws.ping}\`
 
                **__Information Compte__**
 
                > Membre Totaux : \`${message.guild.memberCount}\`
                > Bot(s): \`${message.guild.members.cache.filter(b => b.user.bot).size}\`
                > Utilisateur(s) : \`${message.guild.members.cache.filter(member => !member.user.bot).size}\`
 
                    ** __Statistique Information__ **
 
                > Catégorie : \`${message.guild.channels.cache.filter(channel => channel.type === ChannelType.GuildCategory).size}\`
                > Vocal : \`${message.guild.channels.cache.filter(channel => channel.type === ChannelType.GuildVoice).size}\`
                > Textuel : \`${message.guild.channels.cache.filter(channel => channel.type === ChannelType.GuildText).size}\`
                > Forum : \`${message.guild.channels.cache.filter(channel => channel.type === ChannelType.GuildForum).size}\`
                > Roles : \`${message.guild.roles.cache.size}\`
                > Emojis :\`${message.guild.emojis.cache.size}\`
                    `)
                .setFooter({ text: `${message.user.username}`, iconURL: `${message.user.displayAvatarURL({ dynamic: true })}` })
                .setTimestamp()
                .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))


            message.editReply({ embeds: [serveurEmbed], components: [row] })

        } catch (err) {
            console.log(`Une erreur dans la commande serveur-info`, err)
        }
    }
}