const fs = require('fs');
module.exports = async (prefix, message) => {

  try {

    let caracters = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"]
    let ID = [];
    for (let i = 0; i < 10; i++) ID.push(caracters[Math.floor(Math.random() * caracters.length)])

    return `${prefix}-${ID.join("")}`;

  } catch (err) {
    console.log(`
    >------------ OUPS UNE ERREUR ------------<
    
    UNE ERREUR DANS L'EVENT CREATEID !!

    >--------------- L'ERREUR ----------------<

    ${err}
    
    >-----------------------------------------<
    `)
    fs.writeFile("./erreur.txt", `${err.stack}`, () => { return })
    let channel = await bot.channels.cache.get("1041816985920610354")
    channel.send({ content: `⚠️ UNE ERREUR DANS L'EVENT CREATEID !!`, files: [{ attachment: './erreur.txt', name: 'erreur.txt', description: "L'erreur obtenue" }] })
  }
}