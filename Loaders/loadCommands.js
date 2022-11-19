const console = require("console");
const { readdirSync, lstatSync } = require("fs")

module.exports = async bot => {

  try {

    function scanDir(path) {

      for (const thing of readdirSync(path)) {

        if (lstatSync(path + thing).isDirectory()) scanDir(path + thing + '/')
        else {

          const command = require(path + thing)
          bot.commands.set(command.name, command)
        }
      }
    }
    scanDir(process.cwd() + '/Commandes/')

  } catch (err) {
    console.log(`
    >------------ OUPS UNE ERREUR ------------<
    
    UNE ERREUR DANS LOADERS DANS LOADCOMMANDS !!

    >--------------- L'ERREUR ----------------<

    ${err}
    
    >-----------------------------------------<
    `)
    fs.writeFile("./erreur.txt", `${err.stack}`, () => { return })
    let channel = await bot.channels.cache.get("1041816985920610354")
    channel.send({ content: `⚠️ UNE ERREUR DANS LOADERS DANS LOADCOMMANDS !!`, files: [{ attachment: './erreur.txt', name: 'erreur.txt', description: "L'erreur obtenue" }] })
  }
}