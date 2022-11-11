const Discord = require("discord.js");
const { EmbedBuilder } = require("discord.js")
const Canvasez = require("discord-canvas-easy")

module.exports = (bot, member) => {

    let db = bot.db;

    try {
        db.query(`SELECT * FROM goodbyes WHERE guildId = '${member.guild.id}'`, async (err, req) => {

            if (req.length < 1 || Boolean(req[0].goodbye) === false) return;

            let channel = bot.channels.cache.get(req[0].goodbye)
            if (!channel) return;

            const Goodbye = await new Canvasez.Home()
                //mettre ton image
                .setBackground("./assets/background/goodbye.png")
                .setGuild(member.guild)
                .setUser(member.user)
                .setColorFont("#4B006E")
                .setText(`a quitté le serveur ${member.guild.name}`)
                .toHome()

            await channel.send({ files: [new Discord.AttachmentBuilder(Goodbye.toBuffer(), { name: "goodbye.png" })] })

        })

    } catch (err) {

        console.log("Une erreur dans l'event guildMemberRemove pour la création du création du goodbye.", err)

    }
}