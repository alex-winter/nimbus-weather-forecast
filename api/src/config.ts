const geoLocationApiBaseUrl = 'https://geocoding-api.open-meteo.com/v1/';

export const config = {

    minLocationSearch: 2,
    maxLocationResults: 6,

    geoLocationApi: {
        baseUrl: geoLocationApiBaseUrl,
        search: geoLocationApiBaseUrl + 'search',
    },
};
