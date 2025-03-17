import {Request, Response} from 'express'
import {QueryParameters} from '../types'
import {config} from '../config'
import {Repository as ForecastRepository} from '../services/weather-api/repository'
import {WeatherApiDotCom} from '../services/weather-api/weather-api/weather-api'

//@ts-ignore
export const fiveDayForecastRequestHandler = async (request: Request, response: Response): Response => {
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
}
