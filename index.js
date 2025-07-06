require("colors");

const { validateInput } = require("./helpers/inquirer.js")

const main = async () => {

    const texto = await validateInput('Hola:');
    console.log("hola Mundo :", texto)
}

main();