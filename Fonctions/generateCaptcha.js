const fs = require('fs');
const Canvas = require("canvas");

module.exports = async (message) => {

    try {

        let caracters = [..."123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"]

        let text = [];

        for (let i = 0; i < 6; i++) text.push(caracters[Math.floor(Math.random() * caracters.length)])

        text = text.join("");

        const canvas = Canvas.createCanvas(300, 150)
        const ctx = canvas.getContext("2d")
        const background = await Canvas.loadImage("./y006i80.png")

        ctx.font = '35px "Arial"'
        ctx.fillStyle = "#ffffff"
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = '#0099ff';
        ctx.strokeRect(0, 0, canvas.width, canvas.height);
        ctx.fillText(text, (85 - (ctx.measureText(text).width) / 2), 85)

        return { canvas: canvas, text: text }

    } catch (err) {
      console.log(`
      >------------ OUPS UNE ERREUR ------------<
      
      UNE ERREUR DANS L'EVENT GENERATECAPTCHA !!
  
      >--------------- L'ERREUR ----------------<
  
      ${err}
      
      >-----------------------------------------<
      `)
      fs.writeFile("./erreur.txt", `${err.stack}`, () => { return })
      let channel = await bot.channels.cache.get("1041816985920610354")
      channel.send({ content: `⚠️ UNE ERREUR DANS L'EVENT GENERATECAPTCHA !!`, files: [{ attachment: './erreur.txt', name: 'erreur.txt', description: "L'erreur obtenue" }] })
    }
}