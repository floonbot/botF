const { readdirSync, lstatSync } = require("fs")

module.exports = async bot => {

  try {
    function scanDir(path) {
      for (const thing of readdirSync(path)) {
        if (lstatSync(path + thing).isDirectory()) scanDir(path + thing + '/');
        else {
          const command = require(path + thing);
          console.log(`Commandes ${thing} chargée `);
          bot.commands.set(command.name, command);
        };
      }
    };
    scanDir(process.cwd() + '/Commandes/');
  } catch (err) {

    console.log("Une erreur dans les loaders dans le fichier loadCommands", err)

  }
};