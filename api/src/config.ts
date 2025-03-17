const geoLocationApiBaseUrl = 'https://geocoding-api.open-meteo.com/v1/';

export const config = {

    maxLocationResults: 6,

    geoLocationApi: {
        baseUrl: geoLocationApiBaseUrl,
        search: geoLocationApiBaseUrl + 'search',
    },
};
