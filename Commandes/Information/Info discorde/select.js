const Discord = require("discord.js");

module.exports = {
    name: "select",
    description: "permet de choisir un role",
    permission: "Aucune",
    dm: false,
    category: "👆🏻Information",
    options: [],
    run: async (bot, message, args) => {

        try {
            let mapRole = []

            await message.guild.roles.cache.forEach(async role => {

                if (role.name && role.id && role.id !== message.guild.id) {

                    if (mapRole.length < 25) {

                        mapRole.push({ label: role.name, description: role.name, value: role.id })

                    }
                }
            });

            const row = new Discord.ActionRowBuilder()
                .addComponents(
                    new Discord.SelectMenuBuilder()
                        .setCustomId('select')
                        .setPlaceholder('Select role')
                        .addOptions(mapRole),
                );

            const embed = new Discord.EmbedBuilder()
                .setAuthor({ name: message.user.username, iconURL: message.user.displayAvatarURL() })
                .setFooter({ text: message.guild.name, iconURL: message.guild.iconURL() })
                .setTimestamp()
                .setColor("#0070FF")
                .setDescription(`> Veuillez choisir un role avec le select menu.\n*Vous avez 60 secondes à partir de maintenant.*`)
                .setThumbnail(message.user.displayAvatarURL())

            const msg = await message.reply({

                embeds: [embed],
                components: [row]

            }).catch(e => e);

            const filter = (m) => m.customId === 'select' && m.user.id === message.user.id;

            const collector = await msg.createMessageComponentCollector({ filter, time: 60_000, max: 1, componentType: 3 });

            collector.on("collect", async i => {

                const findRole = await message.guild.roles.cache.get(i.values[0])

                if (findRole && findRole.name) {
                    embed.setDescription(`> On dirait que j'ai retrouvé le role, est-ce bien ${findRole}, \`${findRole.name} | ${findRole.id}\` ?`)
                } else {
                    embed.setDescription(`> Dommage je n'ai pas pu retrouvé le role.`)
                }

                await message.editReply({

                    embeds: [embed],
                    components: []

                }).catch(e => e);
            });

            collector.on("end", async collected => {

                if (collected.size === 0) {

                    embed.setDescription(`> On dirait que vous n'avez pas eu le temp de choisir.\n*veuillez recommencé la commande.*`)

                    await message.editReply({

                        embeds: [embed],
                        components: []

                    }).catch(e => e);
                }
            })
        } catch (err) {

            console.log("Une erreur dans la commande select", err)

        }
    }
}