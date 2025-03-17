import express, { Request, Response } from 'express';
import cors from 'cors';
import {OpenMetroApi} from './services/location-api/open-metro/open-metro'
import {Repository as LocationRepository} from './services/location-api/repository'
import {QueryParameters} from './types'
import {config} from './config'
import {Repository as ForecastRepository} from './services/weather-api/repository'
import {WeatherApiDotCom} from './services/weather-api/weather-api/weather-api'

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
    origin: '*', // Ideally this would come from server
    methods: 'GET',
}));
app.use(express.json());

// @ts-ignore
app.get('/api/locations', async (request: Request, response: Response): Response => {
    const queryParameters: QueryParameters = request.query;
    const search = queryParameters.search;

    if (typeof search !== 'string' || search.length < config.minLocationSearch) {
        return response.status(400)
            .json({error: 'Invalid Search, must have query parameter "search" with at least 2 characters'})
    }

    const locationsApi = new LocationRepository(new OpenMetroApi());

    const locations = await locationsApi.search(search);

    return response.json({
        locations
    });
});

// @ts-ignore
app.get('/api/5-day-forecast', async (request: Request, response: Response): Response => {
    const queryParameters: QueryParameters = request.query;
    const search = queryParameters.search;

    if (typeof search !== 'string' || search.length < config.minLocationSearch) {
        return response.status(400)
            .json({error: 'Invalid Search, must have query parameter "search" with at least 2 characters'})
    }

    const repository = new ForecastRepository(new WeatherApiDotCom());

    const forecast = await repository.get5DayForecast(search)

    return response.json({
        forecast,
    })
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
