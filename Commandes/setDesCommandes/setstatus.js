const Discord = require("discord.js");
const fs = require("fs");


module.exports = {

	name: "setstatus",
	description: "Paramètre les commandes sur le serveur",
	permission: Discord.PermissionFlagsBits.ModerateMembers,
	dm: false,
	category: "🗃️Set des commande",
	options: [
		{
			type: "string",
			name: "activité",
			description: "Quel est l'activité ?",
			required: true,
			autocomplete: true
		},
		{
			type: "string",
			name: "status",
			description: "Quel est le status ?",
			required: true,
			autocomplete: false
		},
		{
			type: "string",
			name: "lien",
			description: "Quel est l'URL ?",
			required: false,
			autocomplete: false
		}
	],
	async run(bot, message, args, db,) {

		try {

			if (message.user.id !== "426866286304428034") return message.reply("Vous ne pouvez pas effectuer la commande, seul le propriétaire du bot peux merci !! ")

			let activity = args.getString("activité")
			if (activity !== "Listening" && activity !== "Playing" && activity !== "Competing" && activity !== "Watching" && activity !== "Streaming") return message.reply({ content: "Merci de choisir une bonne activité !!", ephemeral: true })

			let status = args.getString("status")

			if (activity === "Streaming" && args.getString("lien") === null) return message.reply({ content: "Merci de mettre un lien !!", ephemeral: true })
			if (activity === "Streaming" && !args.getString("lien").match(new RegExp(/^(?:https?:\/\/)?(?:www\.|go\.)?twitch\.tv\/([a-z0-9_]+)($|\?)/))) return message.reply({ content: "Indiqué une url twitch !!", ephemeral: true })

			if (activity === "Streaming") await bot.user.setActivity(status, { type: Discord.ActivityType[activity], url: args.getString("lien") })
			else await bot.user.setActivity(status, { type: Discord.ActivityType[activity] })
			await message.reply({ content: "Status mis à jour !!", ephemeral: true })

		} catch (err) {
			console.log(`
      >------------ OUPS UNE ERREUR ------------<
      
      UNE ERREUR DANS LA COMMANDE SETSTATUS !!

      >--------------- L'ERREUR ----------------<

      ${err}
      
      >-----------------------------------------<
      `)
			fs.writeFile("./erreur.txt", `${err.stack}`, () => { return })
			let channel = await bot.channels.cache.get("1041816985920610354")
			channel.send({ content: `⚠️ UNE ERREUR DANS LA COMMANDE SETSTATUS !!`, files: [{ attachment: './erreur.txt', name: 'erreur.txt', description: "L'erreur obtenue" }] })
		}
	}
}
