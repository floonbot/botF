const Discord = require("discord.js")
const { PermissionsBitField } = require("discord.js")

module.exports = async (bot, message) => {

    let db = bot.db;

    if (message.author.bot || message.channel.type === Discord.ChannelType.DM) return;

    db.query(`SELECT * FROM server WHERE guild = '${message.guild.id}'`, async (err, req) => {

        try {
            if (req.length < 1) {

                db.query(`INSERT INTO server (guild, captcha, logs, antiraid) VALUES (${message.guild.id}, 'false','false','false')`)
            }
        } catch (err) {

            console.log("Une erreur dans l'event messageCreate pour la création du captcha , logs et antiraid.", err)

        }
    })


    db.query(`SELECT * FROM suggests WHERE guildId = '${message.guild.id}'`, async (err, req) => {

        try {
            if (req.length < 1) {

                db.query(`INSERT INTO suggests (guildId, suggest) VALUES (${message.guild.id}, 'false')`)
            }
        } catch (err) {

            console.log("Une erreur dans l'event messageCreate pour la création de la suggestion.", err)

        }
    })

    db.query(`SELECT * FROM welcomes WHERE guildId = '${message.guild.id}'`, async (err, req) => {

        try {
            if (req.length < 1) {

                db.query(`INSERT INTO welcomes (guildId, welcome) VALUES (${message.guild.id}, 'false')`)
            }
        } catch (err) {

            console.log("Une erreur dans l'event messageCreate pour la création du welcome.", err)

        }
    })
    db.query(`SELECT * FROM goodbyes WHERE guildId = '${message.guild.id}'`, async (err, req) => {

        try {
            if (req.length < 1) {

                db.query(`INSERT INTO goodbyes (guildId, goodbye) VALUES (${message.guild.id}, 'false')`)
            }
        } catch (err) {

            console.log("Une erreur dans l'event messageCreate pour la création du goodbye.", err)

        }
    })

    db.query(`SELECT * FROM xp WHERE guildId = '${message.guildId}' AND userId = '${message.author.id}'`, async (err, req) => {

        try {
            if (req.length < 1) {

                db.query(`INSERT INTO xp (guild, guildId, user, userId,  xp, level) VALUES ('${message.guild.name}','${message.guildId}', '${message.author.tag}','${message.author.id}', '0', '0')`)
            } else {

                let level = parseInt(req[0].level)
                let xp = parseInt(req[0].xp)

                if ((level + 1) * 1000 <= xp) {

                    db.query(`UPDATE xp SET xp = '${xp - ((level + 1) * 1000)}' WHERE guildId = '${message.guildId}' AND userId = '${message.author.id}'`)
                    db.query(`UPDATE xp SET level = '${level + 1}' WHERE guildId = '${message.guildId}' AND userId = '${message.author.id}'`)

                    let Embed = new Discord.EmbedBuilder()
                        .setTitle(`Level`)
                        .setColor("#ffffff")
                        .setDescription(`${message.author} est passé niveau ${level + 1}, félicitations `)
                        .setThumbnail(bot.user.displayAvatarURL({ dynamic: true }))
                        .setTimestamp()
                        .setFooter({ text: `Level`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })

                    await message.channel.send({ embeds: [Embed] })

                } else {

                    let xptogive = Math.floor(Math.random() * 30) + 1;

                    db.query(`UPDATE xp SET xp = '${xp + xptogive}' WHERE guildId = '${message.guildId}' AND userId = '${message.author.id}'`)

                    console.log(`${message.author.tag} a gagner ${xptogive} sur le serveur ${message.guild.name}`)
                }
            }
        } catch (err) {

            console.log("Une erreur dans l'event messageCreate pour la création du système d'xp.", err)

        }
    })

    //Antilien
    try {
        if (message.content.includes("https://") || message.content.includes("discord.gg") || message.content.includes("http://")) {

            if (message.member.permissions.has(PermissionsBitField.resolve("ManageChannels"))) {
                return
            } else {
                await message.delete();
                try { await message.member.send({ content: `Le lien/mot ${message.content} est interdits dans le serveur ${message.guild.name}, sauf si tu as la permissions ManageChannels` }) } catch (err) { }
                return await message.channel.send({ content: `${message.author}, Vous n'avez pas le droit de posté ce genre de lien !! Sauf si vous avez la permission MenageChannels` }).then((msg) => {
                    setTimeout(() => msg.delete(), 10000)
                })
            }
        } else if ((!message.content.includes("https://") || !message.content.includes("discord.gg") || !message.content.includes("http://"))) {
            return
        }
    } catch (err) {

        console.log("Une erreur dans l'event messageCreate pour l'anti-lien.", err)

    }
}
