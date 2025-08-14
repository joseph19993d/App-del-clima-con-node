require("colors");
const axios = require('axios').defaults;

const { inquirerMenu, pausa, confirmar, inputText, listarLugares } = require("./helpers/inquirer.js");
const Busquedas = require("./models/busquedas.js");
require('dotenv').config();

const main = async () => {

    const busquedas = new Busquedas();
    let opt = 0;
    do {
        opt = await inquirerMenu();
        switch (opt) {
            case 1:
                // Mostrar mensaje
                const termino = await inputText("Ciudad:");
                const lugares = await busquedas.ciudad(termino);

                if (lugares.length === 0) {
                    console.log("\n No hay resultados para el termino buscado".red);
                    continue;
                } else if (lugares.length === 1) {
                    console.log("\n Un solo resultado encontrado".yellow);

                    // Mostrar el lugar
                    const lugarSeleccionado = lugares[0];
                    console.log(`ID: ${lugarSeleccionado.id}`);
                    console.log(`Nombre: ${lugarSeleccionado.nombre}`);
                    console.log(`País: ${lugarSeleccionado.pais}`);
                    console.log(`Latitud: ${lugarSeleccionado.lat}`);
                    console.log(`Longitud: ${lugarSeleccionado.lng}`);
                    console.log(`Temperatura: ${lugarSeleccionado.temperatura}`);
                    console.log(`Clima: ${lugarSeleccionado.clima}`);

                } else if (lugares.length > 1) {
                    console.log("\n Se encontraron varios resultados".yellow);

                    const idSelecionado = await listarLugares(lugares);

                    if (String(idSelecionado) === '0') {
                        console.log("IDE SELECIONADO ES 0")
                        continue;
                    }
                    // Seleccionar el lugar
                    console.log("idSelecionado", idSelecionado)
                    lugarSeleccionado = lugares.find(lugar => String(lugar.id) === String(idSelecionado));

                    console.log(`ID: ${lugarSeleccionado.id}`);
                    console.log(`Nombre: ${lugarSeleccionado.nombre}`);
                    console.log(`País: ${lugarSeleccionado.pais}`);
                    console.log(`Latitud: ${lugarSeleccionado.lat}`);
                    console.log(`Longitud: ${lugarSeleccionado.lng}`);
                    console.log(`Temperatura: ${lugarSeleccionado.temperatura}`);
                    console.log(`Clima: ${lugarSeleccionado.clima}`);
                }

                break;
            case 2:
                console.log();
                break;
            case 3:
                console.log();
                break;
            default:
                break;
        }
        if (opt == 3) {
            opt = await confirmar("¿Esta seguro que desea salir?") ? 3 : 0;
        } else { await pausa(); }
    } while (opt !== 3);

}

main();