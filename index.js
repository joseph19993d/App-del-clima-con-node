require("colors");
const axios = require('axios').defaults;

const { inquirerMenu, pausa, confirmar, inputText, listarLugares } = require("./helpers/inquirer.js");
const Busquedas = require("./models/busquedas.js");
require('dotenv').config();

const mostrarLugar = (lugar) => {
    console.log(`\n${"Información del lugar:".green}`);
    if (lugar.id) console.log(`ID: ${lugar.id}`);
    if (lugar.nombre) console.log(`Nombre: ${lugar.nombre}`);
    if (lugar.pais) console.log(`País: ${lugar.pais}`);
    if (lugar.lat) console.log(`Latitud: ${lugar.lat}`);
    if (lugar.lon) console.log(`Longitud: ${lugar.lon}`);
};

const mostrarClima = (clima) => {
    console.log(`\n${"Clima actual:".blue}`);
    if (clima.pais) console.log(`País: ${clima.pais}`);
    if (clima.temperatura) {
        if (typeof clima.temperatura === "string") {
            console.log(`Temperatura: ${clima.temperatura}`);
        } else {
            console.log(
                `Temperatura: Principal: ${clima.temperatura.temp}°C / mínima: ${clima.temperatura.min}°C / máxima: ${clima.temperatura.max}°C`
            );
        }
    }
    if (clima.sensacion) console.log(`Sensación: ${clima.sensacion}°C`);
    if (clima.humedad) console.log(`Humedad: ${clima.humedad}%`);
    if (clima.presion) console.log(`Presión: ${clima.presion} hPa`);
    if (clima.clima) console.log(`Clima: ${clima.clima}`);
};

const main = async () => {
    const busquedas = new Busquedas();
    busquedas.leerDB();
    let opt = 0;

    do {
        opt = await inquirerMenu();

        switch (opt) {
            case 1: {
                const ciudadSearch = await inputText("Ciudad:");
                const ciudades = await busquedas.ciudad(ciudadSearch);

                if (!ciudades.length) {
                    console.log("\n No hay resultados para la ciudad buscada".red);
                    break;
                }

                console.log("\n Se encontraron los siguientes resultados".yellow);
                const idSelecionado = await listarLugares(ciudades, "Selecione la ciudad");
                if (String(idSelecionado) === '0') continue;

                const lugarSeleccionado = ciudades.find(c => String(c.id) === String(idSelecionado));
                busquedas.agregarHistorial(lugarSeleccionado.nombre+" / "+lugarSeleccionado.pais);

                console.clear();
                mostrarLugar(lugarSeleccionado);
                break;
            }

            case 2:
                console.log("Historial".green);
                busquedas.historialCapitalizado.forEach((nombreLugar, i) => {
                    console.log(`${i + 1}. `.green, nombreLugar)
                });
                break;

            case 3: {
                const termino = await inputText("Lugar:");
                const lugares = await busquedas.lugar(termino);

                if (!lugares.length) {
                    console.log("\n No hay resultados para el termino buscado".red);
                    break;
                }

                console.log("\n Se encontraron los siguientes resultados: \n".yellow);
                const idSelecionado = await listarLugares(lugares);
                if (String(idSelecionado) === '0') continue;

                const lugarSeleccionado = lugares.find(l => String(l.id) === String(idSelecionado));
                busquedas.agregarHistorial(lugarSeleccionado.nombre);

                mostrarLugar(lugarSeleccionado);

                const climaLugar = await busquedas.climaLugar(lugarSeleccionado.lat, lugarSeleccionado.lon);
                mostrarClima(climaLugar);
                break;
            }
        }

        if (opt === 0) {
            opt = await confirmar("¿Esta seguro que desea salir?") && 0;
        } else {
            await pausa();
        }
    } while (opt !== 0);
};

main();
