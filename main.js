const Discord = require("discord.js")
const intents = new Discord.IntentsBitField(3276799)
const bot = new Discord.Client({ intents })
const config = require("./config")
const loadCommands = require("./Loaders/loadCommands")
const loadEvents = require("./Loaders/loadEvents")
require(`./Fonctions/anti-crash.js`)();


bot.commands = new Discord.Collection()
bot.fonction = {
  createId: require("./Fonctions/createId"),
  generateCaptcha: require("./Fonctions/generateCaptcha"),
}

//create un fichier config.js avec le token du bot. Dans le fichier mettre module.exports = { TOKEN: "Id du token" })
bot.login(config.TOKEN)
loadCommands(bot)
 loadEvents(bot)