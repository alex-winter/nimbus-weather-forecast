import {config as env} from 'dotenv'

env()

const geoLocationApiBaseUrl = 'https://geocoding-api.open-meteo.com/v1/';
const weatherApiBaseUrl = 'https://api.weatherapi.com/v1/';

export const config = {

    corsAllowOrigin: process.env.CORS_ALLOW_ORIGIN,

    minLocationSearch: 2,
    maxLocationResults: 6,

    geoLocationApi: {
        baseUrl: geoLocationApiBaseUrl,
        search: geoLocationApiBaseUrl + 'search',
    },

    weatherApi: {
        baseUrl: weatherApiBaseUrl,
        forecast: weatherApiBaseUrl + 'forecast.json',
        apiKey: process.env.WEATHER_API_KEY || '',
    },
};
