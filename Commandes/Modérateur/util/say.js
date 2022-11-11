const Discord = require("discord.js")
const { EmbedBuilder, ButtonStyle } = require("discord.js")
const { ChannelType } = require("discord.js")
const { ActionRowBuilder } = require("discord.js")
const { ButtonBuilder } = require("discord.js")


module.exports = {
    name: "say",
    description: "Envoyer un message sous l'identiter du bot.",
    permission: Discord.PermissionFlagsBits.ModerateMembers,
    dm: false,
    category: "🧑🏻‍⚖️Modération",
    options: [
        {
            type: "string",
            name: "message",
            description: "Le message à écrire.",
            required: true,
            autocomplete: false
        }
    ],

    async run(bot, message, args) {

        try {

            const msg = args.getString("message");
            message.reply(msg);

        } catch (err) {

            return console.log(`Une erreur sur la commande say`, err)
        }
    }
}