
const axios = require('axios');

class Busquedas {

    historial = ['Madrid', 'paris', 'san jose', 'cartagena',];

    constructor() {
        // TODO: leer la db si existe
    }

    async ciudad(lugar = '') {

        try {
            // Peticion http
            // const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${ encodeURIComponent(lugar) }.json?access_token=${process.env.MAPBOX_KEY}&limit=5`;
            const url = `https://restcountries.com/v3.1/independent?status=true`;
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