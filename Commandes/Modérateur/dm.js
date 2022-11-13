const Discord = require("discord.js");


module.exports = {

    name: "dm",
    description: "DM un membre.",
    category: "🧑🏻‍⚖️Modération",
    permission: Discord.PermissionFlagsBits.ModerateMembers,
    dm: false,
    options: [
        {
            name: "membre",
            type: "user",
            description: "Quel membre voulez-vous que je dm ?",
            required: true,
            autocomplete: false
        },
        {
            name: "texte",
            type: "string",
            description: "Que veux-tu que je lui dise ?",
            required: true,
            autocomplete: false
        }
    ],

    async run(bot, interaction, args, message) {

        let user = await interaction.options.getUser("membre");

        let reason = interaction.options.getString("texte")

        try {
            try {
                let Embed1 = new Discord.EmbedBuilder()
                    .setColor("#00A705")
                    .setTitle(`Message de ${user.tag}.`)
                    .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
                    .setDescription(`${reason}`)
                    .setTimestamp()
                    .setFooter({ text: "Message en mp." })
                await user.send({ embeds: [Embed1] })

            } catch (err) { }

            interaction.reply({ content: `J'ai bien envoyer le message à \_\_${user}\_\_ !`, ephemeral: true });

        } catch (err) {

            console.log(`Une erreur dans la commande dm`, err)

        }
    }
}