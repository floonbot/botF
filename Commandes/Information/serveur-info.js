const fs = require('fs');
const { serveurE, infoE } = require("../.././json/emoji.json");
const { EmbedBuilder, ButtonStyle, ChannelType, ActionRowBuilder, ButtonBuilder } = require("discord.js")

module.exports = {

  name: "serveur-info",
  description: "Permet de voir les Information du serveur",
  dm: false,
  category: "👆🏻Information",

  async run(bot, message) {

    await message.deferReply()

    try {

      const row = new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
            .setLabel("Invite moi")
            .setStyle(ButtonStyle.Link)
            //Mettre le lien de ton bot
            .setURL("https://discord.com/api/oauth2/authorize?client_id=1041282190060826635&permissions=8&scope=bot")
        )

      let serveurEmbed = new EmbedBuilder()
        .setColor("#FF5D00")
        .setTitle(`Chargement de la commande serveur-info !!`)
        .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
        .setDescription(`${serveurE} **__Je cherche les informations sur les serveurs__** ${serveurE}

                > **Sur le serveur :** ${message.guild.name}
     
                 \`Veuillez patienter\``)

        .setTimestamp()
        .setFooter({ text: "serveur-info" })
      await message.followUp({ embeds: [serveurEmbed] }).then(() => {

        serveurEmbed = new EmbedBuilder()
          .setTitle(`Les informations du serveurs ${message.guild.name}`)
          .setColor("#0070FF")
          .setDescription(`
               ${infoE} **__Serveur Informations__**
 
                > Name : \`${message.guild.name}\`
                > ID : \`${message.guild.id}\`
                > Description : \`${message.guild.description}\`
                > Créateur : <@${message.guild.ownerId}>
                > Boost : ${message.guild.premiumSubscriptionCount}
                > Créer le : ${message.guild.createdAt}
                > Vérification : \`${message.guild.verificationLevel}\`
                > Ping : \`${bot.ws.ping}\`
 
                ${infoE} **__Information Compte__**
 
                > Membre Totaux : \`${message.guild.memberCount}\`
                > Bot(s): \`${message.guild.members.cache.filter(b => b.user.bot).size}\`
                > Utilisateur(s) : \`${message.guild.members.cache.filter(member => !member.user.bot).size}\`
 
                ${infoE}  ** __Statistique Information__ **
 
                > Catégorie : \`${message.guild.channels.cache.filter(channel => channel.type === ChannelType.GuildCategory).size}\`
                > Vocal : \`${message.guild.channels.cache.filter(channel => channel.type === ChannelType.GuildVoice).size}\`
                > Textuel : \`${message.guild.channels.cache.filter(channel => channel.type === ChannelType.GuildText).size}\`
                > Forum : \`${message.guild.channels.cache.filter(channel => channel.type === ChannelType.GuildForum).size}\`
                > Roles : \`${message.guild.roles.cache.size}\`
                > Emojis :\`${message.guild.emojis.cache.size}\`
                    `)
          .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
        setTimeout(async () => message.editReply({ embeds: [serveurEmbed], components: [row] }), 1000)
      })

    } catch (err) {
      console.log(`
      >------------ OUPS UNE ERREUR ------------<
      
      UNE ERREUR DANS LA COMMANDE SERVEUR-INFO !!

      >--------------- L'ERREUR ----------------<

      ${err}
      
      >-----------------------------------------<
      `)
      fs.writeFile("./erreur.txt", `${err.stack}`, () => { return })
      let channel = await bot.channels.cache.get("1041816985920610354")
      channel.send({ content: `⚠️ UNE ERREUR DANS LA COMMANDE SERVEUR-INFO !!`, files: [{ attachment: './erreur.txt', name: 'erreur.txt', description: "L'erreur obtenue" }] })
    }
  }
}