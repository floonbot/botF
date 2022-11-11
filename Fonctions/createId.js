
module.exports = async prefix => {

    try {

        let caracters = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"]
        let ID = [];
        for (let i = 0; i < 10; i++) ID.push(caracters[Math.floor(Math.random() * caracters.length)])

        return `${prefix}-${ID.join("")}`;

    } catch (err) {


        console.log("Une erreur dans Fonctions dans le fichier createId.", err)

    }
}