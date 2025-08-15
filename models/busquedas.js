
const axios = require('axios');
const { getName } = require('country-list');
class Busquedas {

    historial = ['Madrid', 'paris', 'san jose', 'cartagena',];

    constructor() {
        // TODO: leer la db si existe
    }

    get paramsOpenWeather() {
        return {
            appid: process.env.OPENWEATHERMAP_API_TOKEN,
            units: 'metric',
            lang: 'es',
            limit: 5,
        }
    }

    get paramsNominatimOpenStreetmap() {
        return {
            format: 'json',
            addressdetails: 1,
            limit: 5,
        }
    }

    get headerOpenStreetMap() {
        return {
            'User-Agent': `${process.env.npm_package_name}/1.0 (${process.env.MY_EMAIL})`
        }
    }

    async ciudad(ciudad = '') {

        try {
            // Peticion http
            const params = { ... this.paramsOpenWeather, q: ciudad };
            const instance = axios.create({
                baseURL: 'https://api.openweathermap.org/data/2.5/find',
                params: params,
            });

            const response = await instance.get();
            return (response.data.list.map(ciudad => ({
                id: ciudad.id,
                nombre: ciudad.name,
                pais: getName(ciudad.sys.country) || ciudad.sys.country,
                lat: ciudad.coord.lat,
                lon: ciudad.coord.lon,
                temperatura: "Principal: " + ciudad.main.temp + " / minima: " + ciudad.main.temp_min + " / maxima: " + ciudad.main.temp_max,
                clima: ciudad.weather[0].description,
            })));

        } catch (error) {
            return [];
        }
    }

    async lugar(busqueda = '') {
        try {
            const params = {
                ...this.paramsNominatimOpenStreetmap,
                q: busqueda,
            };

            const instance = axios.create({
                baseURL: 'https://nominatim.openstreetmap.org',
                params: params,
                headers: this.headerOpenStreetMap
            });

            const response = await instance.get('/search');

            // Nominatim devuelve un array de resultados
            return response.data.map(lugar => ({
                id: lugar.place_id,
                nombre: lugar.display_name,
                lat: lugar.lat,
                lon: lugar.lon
            }));

        } catch (error) {
            console.error(error.message);
            return [];
        }
    }

    async climaLugar(lat, lon) {
        try {

        } catch (error) {
            console.log(error)
        }
    }

}

module.exports = Busquedas;