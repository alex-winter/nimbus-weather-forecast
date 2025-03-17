import {WeatherApi} from './interface'
import {mapToModel} from './weather-api/map-to-model'
import {DayForecast} from '../../models/weather/day-forecast'

export class Repository
{
    constructor(
        private readonly weatherApi: WeatherApi,
    )
    {
    }

    public async get5DayForecast(location: string): Promise<DayForecast[]> {
        const rawData = await this.weatherApi.get5DayForecast(location);

        return mapToModel(rawData)
    }
}
