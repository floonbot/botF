const fs = require("fs")

module.exports = async bot => {

    try {
        fs.readdirSync("./Events").filter(f => f.endsWith(".js")).forEach(async file => {

            let event = require(`../Events/${file}`)
            bot.on(file.split(".js").join(""), event.bind(null, bot))
            console.log(`Evènement ${file} chargée avec succès`)
        })
    } catch (err) {

        console.log("Une erreur dans les loaders dans le fichier loadEvent.", err)

    }
}