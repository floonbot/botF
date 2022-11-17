const Discord = require("discord.js");
const fs = require("fs");
const { king } = require("../.././json/emoji.json");
const { PermissionsBitField, EmbedBuilder } = require("discord.js");

module.exports = {

	name: "admin-list",
	description: "Permet de regarder le nombre d'admin",
	permission: "Aucune",
	dm: false,
	category: "👆🏻Information",

	async run(bot, message) {

		try {

			await message.deferReply()

			const list = message.guild.members.cache.filter(m => !m.user.bot).filter(member => member.permissions.has([PermissionsBitField.Flags.Administrator]))

			let Embed = new Discord.EmbedBuilder()
				.setColor("#FF5D00")
				.setTitle(`Chargement de la commande admin-list !!`)
				.setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
				.setDescription(`${king} **__Je cherche les adminisateurs__** ${king}}
                
                > **sur le serveur :** \`${message.guild.name}\`, 
                
                \`veuillez patienter\`.`)
				.setTimestamp()
				.setFooter({ text: "Admin-list" })
			await message.followUp({ embeds: [Embed] }).then(() => {

				let AdminEmbed = new EmbedBuilder()
					.setTitle("Liste des administrateurs sur le serveur")
					.setColor("#0070FF")
					.setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
					.setDescription(`${king} **__Les pseudo des admins  :__**
                
                ${list.map(m => `> \`${m.user.username}\``).join("\n")}`)
					.setFooter({ text: "Admin-list" })
					.setTimestamp()
				setTimeout(() => message.editReply({ embeds: [AdminEmbed] }), 1000)
			})

		} catch (err) {
			console.log(`
			>------------ OUPS UNE ERREUR ------------<
			
			UNE ERREUR DANS LA COMMANDE ADMIN-LIST !!
	  
			>--------------- L'ERREUR ----------------<

			${err}
			
			>-----------------------------------------<
			`)
			fs.writeFile("./erreur.txt", `${err.stack}`, () => { return })
			let channel = await bot.channels.cache.get("1041816985920610354")
			channel.send({ content: `⚠️ UNE ERREUR DANS LA COMMANDE ADMIN-LIST !!`, files: [{ attachment: './erreur.txt', name: 'erreur.txt', description: "L'erreur obtenue" }] })
		}
	}
}