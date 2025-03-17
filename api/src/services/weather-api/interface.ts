
export interface WeatherApi
{
    get5DayForecast(location: string): Promise<any>
}
