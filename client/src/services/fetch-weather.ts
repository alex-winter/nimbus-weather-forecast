import {config} from '../config'

export type WeatherForecast = {
    date: string;
    description: string;
    temperatureCHigh: number;
    temperatureCLow: number;
    windSpeedKph: number;
};

/**
 * Fetches the 5-day weather forecast for a given location.
 *
 * @param location - The name of the location (city).
 *
 * @returns An array of WeatherForecast objects
 */
export async function getWeatherForecast(location: string): Promise<WeatherForecast[]> {
    try {
        const queryParameters = new URLSearchParams({
            search: location,
        });

        const response = await fetch(`${config.weatherApiUrl}?${queryParameters.toString()}`);

        if (!response.ok) {
            throw new Error("Failed to fetch weather data");
        }

        const data = await response.json();

        return data.forecast;
    } catch (error) {
        console.error("Error fetching weather forecast:", error);

        /**
         * Something like sentry here
         */

        return [];
    }
}
