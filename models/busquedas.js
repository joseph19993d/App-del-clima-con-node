
const axios = require('axios');
const { getName } = require('country-list');
class Busquedas {

    historial = ['Madrid', 'paris', 'san jose', 'cartagena',];

    constructor() {
        // TODO: leer la db si existe
    }

    get paramsOpenWeather() {
        return {
            appid: process.env.API_TOKEN,
            units: 'metric',
            lang: 'es',
            limit: 5,
        }
    }

    async ciudad(lugar = '') {

        try {
            // Peticion http
            const params = { ... this.paramsOpenWeather, q: lugar };
            const instance = axios.create({
                baseURL: 'https://api.openweathermap.org/data/2.5/find?',
                params: params,
            });

            const response = await instance.get();
            return (response.data.list.map(lugar => ({
                id: lugar.id,
                nombre: lugar.name,
                pais: getName(lugar.sys.country) || lugar.sys.country,
                lat: lugar.coord.lat,
                lng: lugar.coord.lon,
                temperatura: "Principal: " + lugar.main.temp + " / minima: " + lugar.main.temp_min + " / maxima: " + lugar.main.temp_max,
                clima: lugar.weather[0].description,
            })));

        } catch (error) {
            return [];
        }
    }

}

module.exports = Busquedas;