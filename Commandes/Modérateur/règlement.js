const fs = require('fs');
const { EmbedBuilder, ButtonStyle, ActionRowBuilder, ButtonBuilder, PermissionFlagsBits } = require('discord.js');
const { reglement, } = require("../.././json/emoji.json");

module.exports = {

  name: "règlement",
  description: "Choisir le salon pour mettre un règlement",
  permission: PermissionFlagsBits.Administrator,
  category: "🤴🏻Admin",
  dm: false,
  options: [
    {
      type: "channel",
      name: "channel",
      description: "Quel est le channel ?",
      required: true,
      autocomplete: false,
    }, {
      type: 'role',
      name: "role",
      description: "Quel est le role ?",
      required: true,
      autocomplete: false,
    },
  ],

  async run(bot, message, args) {

    let channel = args.getChannel('channel')
    if (!channel) return message.reply({ content: ":x: | Le channel est pas définie ou le le nom du channel n'est pas bon !!", ephemeral: true })
    let role = args.getRole('role')
    if (!role) return message.reply({ content: `:x: | Rôle non fonder !!`, ephemeral: true })

    try {

      await message.deferReply()

      let Embed = new EmbedBuilder()

        .setColor("#FF5D00")
        .setTitle(`Chargement de la commande réglement`)
        .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
        .setDescription(`${reglement} **__Je crée le règlement__**${reglement}

                > **Sur le serveur :** ${message.guild.name}, 
                
                \`veuillez patienter\`.`)
        .setTimestamp()
        .setFooter({ text: "règlement" })


      await message.followUp({ embeds: [Embed] }).then(() => {

        let VerifEmbed = new EmbedBuilder()
          .setTitle('Le réglement du serveur')
          .setDescription("**3 avertissements = 1 bannissement** \n\n  - **Les avertissements sont envoyés en messages privés, soyez donc sûr de les ouvrir aux personnes présentes sur les mêmes serveurs que vous !**\n\n  - **Les pseudos incorrects(sauf floon), insultants, à toute allusion sexuelle sont prohibés. Tout pseudo de ce genre amènera à une exclusion du serveur. Si le membre revient avec le même pseudo après avertissement, un bannissement pourra être envisagé.**\n\n - **Ne pas faire de publicité sur les channels non prévues à cet effet. Si le membre continue après qu'un membre de l'équipe l'aie prévenu : 1 avertissement. Attention, la publicité pour d'autres discords n'est pas autorisée, sauf cas exceptionnels, gérés au cas par cas par l'équipe.**\n \n - **Ne pas spammer/flooder les channels écrits. Un spam = 1 avertissement.**\n \n  - **Les liens à contenu illégal, sensible, ou -18 ans sont interdits. Par exemple : téléchargement illégal, sites pornographiques, etc... Un lien de ce genre posté = 2 avertissements.**\n \n ** - Les propos et photos à contenu raciste, religieux, pornographique sont interdites, même sous couverture \"d'humour noir\". Un contenu de ce genre envoyée = bannissement immédiat.** \n \n - **Ne pas harceler les membres du serveur, mais aussi les membres de l'équipe.**\n \n ** - Rester courtois et respectueux envers les membres du serveur et les membres de l'équipe.**\n \n **  - Tout problème privé doit rester privé. Les channels publics ne sont pas là pour vous permettre de régler vos problèmes personnels. Si vous avez un problème avec un membre, contactez-le en privé (en restant courtois) ou parlez-en avec un membre de l'équipe. Un avertissement pourra être envoyé si cela arrive plusieurs fois.**\n \n  - **Ne pas poster d'informations personnelles (photographies, adresse, mot de passe de quelconque site ou plateforme...). L'équipe du Discord n'est en aucun cas responsable des éventuels problèmes si vous partagez vos mots de passe.**\n \n ** - Vous êtes responsable de votre compte. Tous les messages envoyés depuis ce dernier sont sous votre entière responsabilité.**\n \n \n  \`Click sur le boutton  (✅) pour accepter le réglement !\`")
          .setThumbnail(bot.user.displayAvatarURL())
          .setFooter({ text: `${bot.user.username} | règlement`, iconURL: bot.user.displayAvatarURL() })
          .setColor("#FF5D")

        let sendChannel = message.editReply({

          embeds: [VerifEmbed],
          components: [new ActionRowBuilder()
            .addComponents(
              new ButtonBuilder()
                .setCustomId(`reglement${role.id}`)
                .setEmoji('✅')
                .setStyle(ButtonStyle.Success)
                .setDisabled(false)
            )]
        })

        if (!sendChannel) { return message.editReply({ content: ':x: | **Une erreur est survenue !**', ephemeral: true }) }
        else return message.editReply({ content: `Vérification effectuer avec succès ! ${channel}`, ephemeral: true })
      })

    } catch (err) {

      console.log("Une erreur dans la commande règlement.", err)

      fs.writeFile("./erreur.txt", `${err.stack} `, () => {
        return
      })

      let channel = await bot.channels.cache.get("1041816985920610354")
      channel.send({ content: `⚠️ Une erreur est apparue! Sur le  ${message.guild.name} !`, files: [{ attachment: './erreur.txt', name: 'erreur.txt', description: "L'erreur obtenue" }] })
    }
  }
}