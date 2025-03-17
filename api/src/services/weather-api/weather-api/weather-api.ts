import { config } from '../../../config';
import {WeatherApi} from '../interface'

export class WeatherApiDotCom implements WeatherApi
{
    constructor(private fetch: typeof global.fetch = global.fetch)
    {
    }

    public async get5DayForecast(location: string): Promise<any> {
        try {
            const queryParameters = new URLSearchParams({
                key: config.weatherApi.apiKey,
                q: location,
                days: '5',
            });

            const response = await this.fetch(
                `${config.weatherApi.forecast}?${queryParameters.toString()}`
            );

            if (!response.ok) {
                throw new Error('Failed to fetch data from external API');
            }

            const data = await response.json();

            return data.forecast.forecastday;
        } catch (error) {
            console.error("Error fetching locations:", error);

            /**
             * Could log these to something such as Sentry
             */

            return [];
        }
    }
}
