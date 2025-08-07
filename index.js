require("colors");
const axios = require('axios').defaults;

const { inquirerMenu, pausa, confirmar, inputText} = require("./helpers/inquirer.js")

const main = async () => {

    let opt= 0;
    do{
        opt = await inquirerMenu();
        switch(opt){
            case 1:
                const response = await inputText("Ciudad:");
                console.log(response);
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