const Discord = require("discord.js")
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType, SelectMenuBuilder } = require("discord.js")


module.exports = async (bot, interaction) => {

    //autocomplete

    if (interaction.type === Discord.InteractionType.ApplicationCommandAutocomplete) {

        try {
            let entry = interaction.options.getFocused()

            if (interaction.commandName === "help") {

                let choices = bot.commands.filter(cmd => cmd.name.includes(entry))
                await interaction.respond(entry === "" ? bot.commands.map(cmd => ({ name: cmd.name, value: cmd.name })) : choices.map(choice => ({ name: choice.name, value: choice.name })))
            }
           

            if (interaction.commandName === "eval") {

                let choices = ["+", "-", "*", "/", "%"]
                let sortie = choices.filter(c => c.includes(entry))
                await interaction.respond(entry === "" ? sortie.map(c => ({ name: c, value: c })) : sortie.map(c => ({ name: c, value: c })))
            }

            if (interaction.commandName === "gif") {

                let choices = ["kill", "kiss", "badass", "punch"]
                let sortie = choices.filter(c => c.includes(entry))
                await interaction.respond(entry === "" ? sortie.map(c => ({ name: c, value: c })) : sortie.map(c => ({ name: c, value: c })))
            }
            if (interaction.commandName === "nsfw") {

                let choices = ["pussy", "aHarem"]
                let sortie = choices.filter(c => c.includes(entry))
                await interaction.respond(entry === "" ? sortie.map(c => ({ name: c, value: c })) : sortie.map(c => ({ name: c, value: c })))
            }
            if (interaction.commandName === "pfc") {

                let choices = ["pierre", "feuille", "ciseaux"]
                let sortie = choices.filter(c => c.includes(entry))
                await interaction.respond(entry === "" ? sortie.map(c => ({ name: c, value: c })) : sortie.map(c => ({ name: c, value: c })))
            }

        } catch (err) {

            console.log("Une erreur dans l'event interactionCreate pour l'autocomplete.", err)

        }
    }

    //Creation des commands

    if (interaction.type === Discord.InteractionType.ApplicationCommand) {

        try {
            const command = interaction.client.commands.get(interaction.commandName);
            command?.run?.(bot, interaction, interaction.options, bot.db)

        } catch (err) {

            console.log("Une erreur dans l'event interactionCreate pour la création des commande.", err)
        }
    }

    //Creation des bouttons pour le réglement et ticket

    if (interaction.isButton()) {

        try {
            if (interaction.customId.startsWith("reglement")) {

                const role = interaction.guild.roles.cache.get(interaction.customId.split("reglement")[1])
                interaction.member.roles.add(role.id).then(() => {
                    interaction.reply({ content: `<@&${role.id}> a étais ajouter `, ephemeral: true })

                })
            }
        } catch (err) {

            console.log("Une erreur dans l'event interactionCreate pour la création des boutons pour le réglement.", err)

        }


        try {

            if (interaction.customId === "primary") {

                let channel = await interaction.guild.channels.create({
                    name: `${interaction.user.username} ticket`,
                    type: Discord.ChannelType.GuildText,
                    permissionOverwrites: [
                        {
                            id: interaction.guild.roles.everyone,
                            deny: [Discord.PermissionFlagsBits.ViewChannel],
                        }, {
                            id: interaction.user,
                            allow: [Discord.PermissionFlagsBits.SendMessages, Discord.PermissionFlagsBits.ViewChannel, Discord.PermissionFlagsBits.ReadMessageHistory],
                        }
                    ],
                })

                await interaction.reply({ content: `**Ticket créer avec succes ${channel}**`, ephemeral: true })

                const clearembed = new Discord.EmbedBuilder()
                    .setTitle(`${interaction.user.username}`)
                    .setDescription(`${interaction.user}\n merci de patienter que le staff vienent vous aider ecrivez votre probleme dans le ticket`)
                    .setColor("Aqua")

                const deletebutton = new Discord.ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId('delete')
                            .setEmoji("❌")
                            .setLabel('Supprimer le ticket')
                            .setStyle(ButtonStyle.Danger)
                    );

                await channel.send({ embeds: [clearembed], components: [deletebutton] })
            }


            if (interaction.customId === "delete") {

                const surbutton = new Discord.ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId('oui')
                            .setLabel('oui')
                            .setStyle(ButtonStyle.Primary)
                    )
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId('non')
                            .setLabel('non')
                            .setStyle(ButtonStyle.Danger)
                    )

                await interaction.reply({ content: "**Etes vous sur de vouloir supprimer ce ticket ?**", components: [surbutton], ephemeral: true })
            }

            if (interaction.customId === "oui") {

                await interaction.guild.channels.delete(interaction.channel)
            }
            if (interaction.customId === "non") {
                await interaction.reply({ content: "**Suppresion de ticket annulé**", ephemeral: true })
            }


        } catch (err) {

            console.log("Une erreur dans l'event interactionCreate pour la création des boutons pour le ticket.", err)

        }
    }
}





