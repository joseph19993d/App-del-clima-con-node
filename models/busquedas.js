const fs = require ('fs')
const axios = require('axios');
const { getName } = require('country-list');
class Busquedas {

    historial = [];
    dbPath = './db/database.json';

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

    get historialCapitalizado(){
        return this.historial.map((lugar) => {
            let palabras = lugar.split(' '); 
            palabras = palabras.map(palabra => palabra[0].toUpperCase() + palabra.substring(1));
            return palabras.join(' ');
        })
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
            const params = { ...this.paramsOpenWeather, lat, lon };

            const instance = axios.create({
                baseURL: 'https://api.openweathermap.org/data/2.5/weather',
                params
            });

            const response = await instance.get();

            const data = response.data;

            return {
                nombre: data.name,
                pais: getName(data.sys.country) || data.sys.country,
                lat: data.coord.lat,
                lon: data.coord.lon,
                temperatura: `Principal: ${data.main.temp}°C / mínima: ${data.main.temp_min}°C / máxima: ${data.main.temp_max}°C`,
                sensacion: `${data.main.feels_like}°C`,
                humedad: `${data.main.humidity}%`,
                presion: `${data.main.pressure} hPa`,
                clima: data.weather[0].description,
            };

        } catch (error) {
            console.error(error.message);
            return null;
        }
    }

    agregarHistorial(lugar){
        // TODO: prevenir duplicados
        lugar = String(lugar)
        if(this.historial.includes( lugar.toLocaleLowerCase())) return;
        this.historial = this.historial.splice(0,5);
        this.historial.unshift(lugar.toLocaleLowerCase());
        this.guardarDB();
    }

    guardarDB(){
        const payload ={ historial: this.historial} 
        fs.writeFileSync(this.dbPath, JSON.stringify(payload))
    }

    leerDB(){
        const db = fs.readFileSync(this.dbPath,{encoding:'utf-8'})
        if(db){
            const dbObject =JSON.parse(db);
            console.log(dbObject)
            if(dbObject?.historial){
                this.historial = dbObject.historial
            }
        }
    }

}

module.exports = Busquedas;