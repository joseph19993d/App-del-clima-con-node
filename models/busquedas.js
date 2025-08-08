
const axios = require('axios');

class Busquedas {

    historial = ['Madrid', 'paris', 'san jose', 'cartagena',];

    constructor() {
        // TODO: leer la db si existe
    }

    async ciudad(lugar = '') {

        try {
            // Peticion http
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${lugar}&appid=${process.env.API_TOKEN}&units=metric`;
            console.log(`Buscando lugar: ${lugar}...`);
            const response = await axios.get(url);
            console.log(response.data);
            return [];

        } catch (error) {
            return [];
        }
    }

}

module.exports = Busquedas;