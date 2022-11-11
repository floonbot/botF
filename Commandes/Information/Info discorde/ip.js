const Discord = require('discord.js')
const { EmbedBuilder } = require("discord.js")
const libquery = require('libquery')

module.exports = {

    name: "ip",
    description: "Permet d'avoir l'ip du serveur.",
    permission: "Aucune",
    dm: false,
    category: "👆🏻Information",

    async run(bot, message, args) {

        try {
            libquery.query(`sulfuritium.fr`, 19132, 1000).then((data) => {
                const onembed = new EmbedBuilder()
                    .setTitle(`Statut`)
                    .setColor("#0070FF")
                    .setThumbnail(url = "https://cdn.discordapp.com/attachments/837807770395869195/944521377334063124/MOSHED-2022-2-5-10-43-29.gif")
                    .setDescription(`> 📡 | Statut: **Online (🟢)**
        > 📌 | IP: sulfuritium.fr
        > 🔗 | Port: 19132
        > 👥 | Nombre de joueur en ligne: **${data.online}/${data.max}**`)
                    .setTimestamp()

                message.reply({ embeds: [onembed] })
            }).catch(() => {
                const offembed = new EmbedBuilder()
                    .setTitle(`Statut`)
                    .setColor("#0070FF")
                    .setThumbnail(url = "https://cdn.discordapp.com/attachments/837807770395869195/944521377334063124/MOSHED-2022-2-5-10-43-29.gif")
                    .setDescription(`> 📡 | Statut: **Offline (🔴)**
        > 📌 | IP: sulfuritium.fr
        > 🔗 | Port: 19132
        > 👥 | Nombre de joueur en ligne: **??/??**`)
                    .setTimestamp()
                message.reply({ embeds: [offembed] })
            });

        } catch (err) {

            console.log("Une erreur dans la commande ip.", err)

        }
    }
}
