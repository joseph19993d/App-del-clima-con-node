# Weather CLI App 🌍☀️🌧️

Una aplicación de consola en **Node.js** que permite buscar lugares y obtener información climática en tiempo real utilizando la API de **Mapbox** y **OpenWeather**.

---

## 🚀 Características
- Búsqueda de ciudades/lugares con autocompletado.
- Consulta del clima en tiempo real.
- Historial de búsquedas persistente.
- Integración con APIs externas.
- Resultados claros y organizados en consola.

---

## 📂 Estructura del Proyecto
```
├── index.js          # Punto de entrada principal
├── package.json      # Dependencias y scripts
├── /models           # Lógica de negocio (ej. Busquedas.js)
├── /helpers          # Funciones auxiliares (inquirer, validaciones, etc.)
├── /db               # Archivos JSON para historial persistente
└── README.md         # Documentación
```

---

## ⚙️ Requisitos
- Node.js v20+
- NPM

---

## 📦 Instalación
```bash
# Clonar el repositorio
git clone <REPO_URL>

# Entrar en la carpeta del proyecto
cd nmbre_de_la_carpeta / APP-DEL-CLIMA-CON-NODE

# Instalar dependencias
npm install
```

---

## ▶️ Uso
```bash
# Ejecutar la aplicación
npm run start
```

Se mostrará un menú interactivo en consola con opciones como:
- Buscar ciudad
- Buscar lugar
- Ver historial
- Salir

---

## 🌐 Variables de Entorno
Se requiere configurar las siguientes variables en un archivo `.env` en la raíz del proyecto:

```
OPENWEATHERMAP_API_TOKEN = tu_api_key_openweather
MY_EMAIL = tu_email
```

---

## 📊 Ejemplo de Uso
```
? Seleccione una opción:
  1. Buscar ciudad
  2. Ver historial
  0. Salir

> Buscar ciudad: "Cartagena"
  - Nombre: Cartagena de Indias, Bolívar, Colombia
  - Lat: 10.4266
  - Lon: -75.5442

Información del clima:
  - País: CO
  - Temperatura: 28°C
  - Sensación: 30°C
  - Humedad: 85%
  - Presión: 1012 hPa
  - Clima: Cielo despejado
```

---

## 🛠️ Tecnologías Usadas
- [Node.js](https://nodejs.org/)
- [Inquirer](https://www.npmjs.com/package/inquirer)
- [Colors](https://www.npmjs.com/package/colors)
- [Axios](https://www.npmjs.com/package/axios)
- [Dotenv](https://www.npmjs.com/package/dotenv)
- APIs: [Mapbox](https://www.mapbox.com/) y [OpenWeather](https://openweathermap.org/)

---

## 📌 Autor
Desarrollado por **Joseph Rodelo Suarez** 🚀
