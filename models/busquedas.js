
const axios = require('axios');

class Busquedas {

    historial = ['Madrid', 'paris', 'san jose', 'cartagena',];

    constructor() {
        // TODO: leer la db si existe
    }
    get paramsOpenWeather() {
        return {
            appid: process.env.API_TOKEN,
            units: 'metric',
            lang: 'es'
        }
    }

    async ciudad(lugar = '') {

        try {
            // Peticion http
            const params = {... this.paramsOpenWeather, q: lugar };
            const instance = axios.create({ 
                baseURL: 'https://api.openweathermap.org/data/2.5/weather',
                params: params,
            });
            const apitoken= "f60acabe56ee89e4ae1e40585dad8613";
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${lugar}&appid=${apitoken}&units=metric`;
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