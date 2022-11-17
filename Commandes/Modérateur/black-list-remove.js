const Discord = require("discord.js");
const fs = require("fs");
const { stopE, modoE, serveurE, userE } = require("../.././json/emoji.json");

module.exports = {

  name: "black-list-remove",
  description: "Supprime un joueur de la blacklist",
  permission: Discord.PermissionFlagsBits.ModerateMembers,
  dm: false,
  category: "🧑🏻‍⚖️Modération",
  options: [
    {
      type: "user",
      name: "membre",
      description: "Quel est le membre a unblack list",
      required: true
    },
  ],

  async run(bot, message, args, db) {

    let user = args.getUser("membre")
    if (!user) return message.reply({ content: "Pas de membre !!", ephemeral: true })
    let member = message.guild.members.cache.get(user.id)
    if (!member) return message.reply({ content: "Pas de membre !!", ephemeral: true })

    try {

      db.query(`SELECT * FROM blacklists WHERE guildId = '${message.guildId}' AND user = '${user.id}'`, async (err, req) => {

        await req.sort((a, b) => parseInt(a.date) - parseInt(b.date))
        if (req.length <= 0) return message.reply({ content: "Cette personne n'est pas blacklister !!", ephemeral: true })

        db.query(`DELETE FROM blacklists WHERE guildId = '${message.guildId}' AND user = '${user.id}'`)

        await message.deferReply()

        let pingEmbed = new Discord.EmbedBuilder()
          .setColor("#FF5D00")
          .setTitle(`Chargement de la commande black_list_remove !!`)
          .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
          .setDescription(`${stopE} **__Je cherche le membre a black list__** ${stopE}
    
                > **Sur le serveur :** ${message.guild.name}, 
                
                \`veuillez patienter\`.`)
          .setTimestamp()
          .setFooter({ text: "un black-list" })
        await message.followUp({ embeds: [pingEmbed] }).then(() => {

          let Embed = new Discord.EmbedBuilder()
            .setColor("#FF0000")
            .setTitle(`Le membre est bien supprimé de la black list`)
            .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
            .setDescription(`${stopE} **__Black list__** 
             
            > ${serveurE} **Serveur :**  \`${message.guild.name}\`
            > ${modoE} **Modérateur :** \`${message.user.tag}\`
            > ${userE} **Membre qui est supprimé de la black list :** \`${user.tag}\``)
            .setTimestamp()
            .setFooter({ text: "Unblack list" })
          setTimeout(async () => await message.editReply({ embeds: [Embed] }), 2000)
        })

        const removeRole = member.guild.roles.cache.find(r => r.name === "Black list")
        member.roles.remove(removeRole)
      })

    } catch (err) {
      console.log(`
      >------------ OUPS UNE ERREUR ------------<
      
      UNE ERREUR DANS LA COMMANDE BLACK-LIST-REMOVE !!

      >--------------- L'ERREUR ----------------<

      ${err}
      
      >-----------------------------------------<
      `)
      fs.writeFile("./erreur.txt", `${err.stack}`, () => { return })
      let channel = await bot.channels.cache.get("1041816985920610354")
      channel.send({ content: `⚠️ UNE ERREUR DANS LA COMMANDE BLACK-LIST-REMOVE !!`, files: [{ attachment: './erreur.txt', name: 'erreur.txt', description: "L'erreur obtenue" }] })
    }
  }
}