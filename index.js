require("colors");
const axios = require('axios').defaults;

const { inquirerMenu, pausa, confirmar, inputText} = require("./helpers/inquirer.js");
const Busquedas = require("./models/busquedas.js");

const main = async () => {

    const busquedas = new Busquedas();
    let opt= 0;
    do{
        opt = await inquirerMenu();
        switch(opt){
            case 1:
                // Mostrar mensaje
                const lugar = await inputText("Ciudad:");
                console.log(lugar);

                // Buscar los lugares

                // Seleccionar el lugar

                // Datos del clima

                //motrar resultados
                console.log('\nInformacion del lugar\n'.green);
                console.log('Ciudad:', 'San Jose');
                console.log('Lat:', 9.9281);
                console.log('Lng:', -84.0907);
                console.log('Temperatura:', 25);    
                console.log('Minima:', 20);
                console.log('Maxima:', 30);

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
        if(opt == 3){
            opt = await confirmar("¿Esta seguro que desea salir?")? 3: 0;
        }else{await pausa();}
    }while(opt !== 3 );

} 

main();