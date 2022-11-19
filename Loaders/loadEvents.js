const fs = require("fs")

module.exports = async bot => {

    try {

        fs.readdirSync("./Events").filter(f => f.endsWith(".js")).forEach(async file => {

            let event = require(`../Events/${file}`)
            bot.on(file.split(".js").join(""), event.bind(null, bot))
        })

    } catch (err) {
        console.log(`
        >------------ OUPS UNE ERREUR ------------<
        
        UNE ERREUR DANS LOADERS DANS LOADEVENTS !!
    
        >--------------- L'ERREUR ----------------<
    
        ${err}
        
        >-----------------------------------------<
        `)
        fs.writeFile("./erreur.txt", `${err.stack}`, () => { return })
        let channel = await bot.channels.cache.get("1041816985920610354")
        channel.send({ content: `⚠️ UNE ERREUR DANS LOADERS DANS LOADEVENTS !!`, files: [{ attachment: './erreur.txt', name: 'erreur.txt', description: "L'erreur obtenue" }] })
    }
}