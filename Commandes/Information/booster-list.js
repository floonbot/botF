const {  EmbedBuilder } = require("discord.js");
const {boostE} = require("../.././json/emoji.json");

module.exports = {

    name: "booster-list",
    description: "Permet de voir la liste des boosts sur le serveur",
    permission: "Aucune",
    dm: false,
    category: "👆🏻Information",

    async run(bot, message) {

        try {

            await message.deferReply()

            const booster = message.guild.members.cache.filter(member => member.preniumSince).map(m => `> \`${m.user.tag}\``).join(`\n`) || "Auncun Utilisateur"

            let Embed = new EmbedBuilder()
                .setColor("#FF5D00")
                .setTitle(`Chargement de la commande booster-list !!`)
                .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
                .setDescription(`${boostE} **__Je cherche les membres qui ont boost le serveur__** ${boostE}
                
                > **sur le serveur :** \`${message.guild.name}\`, 
                
                \`veuillez patienter\`.`)
                .setTimestamp()
                .setFooter({ text: "booster-list" })

            await message.followUp({ embeds: [Embed] }).then(() => {

            let boostEmbed = new EmbedBuilder()
                .setTitle("Liste des boosts")
                .setColor("#0070FF")
                .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
                .setDescription(`${boostE} **__Le nombre de boost :__**
                
                 ${booster}`)
                .setFooter({ text: "boost-list" })
                .setTimestamp()

         setTimeout(async() => await message.followUp({ embeds: [boostEmbed] }), 1000)
        })
        } catch (err) {

            console.log(`Une erreur dans la commande booster-list.`, err);

            
            fs.writeFile("./erreur.txt", `${err.stack}`, () => {
                return
            })

            let channel = await bot.channels.cache.get("1038859689833791528")
            channel.send({ content: `⚠️ Une erreur est apparue ! Sur le  ${message.guild.name} !`, files: [{ attachment: './erreur.txt', name: 'erreur.txt', description: "L'erreur obtenue" }] })
        }
    }
}