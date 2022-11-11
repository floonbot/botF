const Discord = require("discord.js");
const { PermissionsBitField, EmbedBuilder } = require("discord.js")

module.exports = {

    name: "role-member-list",
    description: "Permet de voir la liste des members possédant le rôle.",
    permission: "Aucune",
    dm: false,
    category: "👆🏻Information",
    options: [
        {
            type: 'role',
            name: "role",
            description: "Quel est le rôle ?",
            required: true,
            autocomplete: false,
        }
    ],

    async run(bot, message, args, db) {

        try {

            await message.deferReply()

            const roled = message.options.getRole("role");

            let roleEmbed = new EmbedBuilder()
                .setTitle("Liste des membres possédant le rôle")
                .setColor("#0070FF")
                .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
                .setDescription(`**__Les pseudo des membre qui posséde le rôle__ ${roled} :**
                
                ${roled.members.map(m => `> \`${m.user.username}\``).join("\n") || "Aucun utilisateur"}`)
                .setFooter({ text: "rôle list" })
                .setTimestamp()

            await message.followUp({ embeds: [roleEmbed] })

        } catch (err) {

            console.log(`Une erreur dans la commande role-member-list.`, err);
        }

    }
}