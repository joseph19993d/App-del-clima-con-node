require("colors");
const axios = require('axios').defaults;

const { inquirerMenu, pausa, confirmar, inputText, listarLugares } = require("./helpers/inquirer.js");
const Busquedas = require("./models/busquedas.js");
require('dotenv').config();

const main = async () => {

    const busquedas = new Busquedas();
    busquedas.leerDB();
    let opt = 0;
    do {
        opt = await inquirerMenu();

        switch (opt) {
            case 1:
                // Mostrar mensaje
                const ciudadSearch = await inputText("Ciudad:");
                const ciudades = await busquedas.ciudad(ciudadSearch);

                if (ciudades.length === 0) {
                    console.log("\n No hay resultados para la ciudad buscada".red);
                } else if (ciudades.length >= 1) {
                    console.log("\n Se encontraron los siguientes resultados".yellow);

                    //Menu de ciudades para seleccionar
                    const idSelecionado = await listarLugares(ciudades, "Selecione la ciudad");

                    if (String(idSelecionado) === '0') continue;
                    lugarSeleccionado = ciudades.find(ciudad => String(ciudad.id) === String(idSelecionado));

                    //Agregar historial
                    busquedas.agregarHistorial(String(lugarSeleccionado.nombre))

                    console.log(`ID: ${lugarSeleccionado.id}`);
                    console.log(`Nombre: ${lugarSeleccionado.nombre}`);
                    console.log(`País: ${lugarSeleccionado.pais}`);
                    console.log(`Latitud: ${lugarSeleccionado.lat}`);
                    console.log(`Longitud: ${lugarSeleccionado.lon}`);
                    console.log(`Temperatura: ${lugarSeleccionado.temperatura}`);
                    console.log(`Clima: ${lugarSeleccionado.clima}`);
                }

                break;
            case 2:
                console.log("historial".green);
                busquedas.historial.forEach((nombreLugar, i) => {
                    console.log(`${i + 1}. `.green, nombreLugar)
                })
                break;
            case 3:

                // Mostrar mensaje
                const termino = await inputText("Lugar:");
                const lugares = await busquedas.lugar(termino);

                if (lugares.length === 0) {

                    console.log("\n No hay resultados para el termino buscado".red);

                } else if (lugares.length >= 1) {

                    console.log("\n Se encontraron los siguientes resultados: \n".yellow);

                    //Mostrar opciones
                    const idSelecionado = await listarLugares(lugares);
                    if (String(idSelecionado) === '0') {
                        continue;
                    }
                    lugarSeleccionado = lugares.find(lugares => String(lugares.id) === String(idSelecionado));

                    //Agregar historial
                    busquedas.agregarHistorial(String(lugarSeleccionado.nombre))

                    //Mostrar el lugar
                    console.log(`\nNombre: ${lugarSeleccionado.nombre}`);
                    console.log(`Latitud: ${lugarSeleccionado.lat}`);
                    console.log(`Longitud: ${lugarSeleccionado.lon}`);
                    const climalugar = await busquedas.climaLugar(lugarSeleccionado.lat, lugarSeleccionado.lon)
                    console.log("pais: ", climalugar.pais)
                    console.log("temperatura: ", climalugar.temperatura)
                    console.log("sensacion: ", climalugar.sensacion)
                    console.log("humedad: ", climalugar.humedad)
                    console.log("presion: ", climalugar.presion)
                    console.log("clima: ", climalugar.clima)
                }

                break;
            default:
                break;
        }
        if (opt === 0) {
            opt = await confirmar("¿Esta seguro que desea salir?") && 0;
        } else { await pausa(); }
    } while (opt !== 0);

}

main();