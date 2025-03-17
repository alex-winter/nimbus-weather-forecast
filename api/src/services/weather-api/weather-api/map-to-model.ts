import { DayForecast } from '../../../models/weather/day-forecast';

export function mapToModel(data: any): DayForecast[] {
    if (!Array.isArray(data)) return [];

    return data
        .filter((item) =>
            typeof item === 'object' &&
            typeof item.day === 'object' &&
            typeof item.day.condition === 'object' &&
            typeof item.day.condition.text === 'string' &&
            typeof item.date === 'string' &&
            typeof item.day.maxtemp_c === 'number' &&
            typeof item.day.mintemp_c === 'number' &&
            typeof item.day.maxwind_kph === 'number'
        )
        .map(item => new DayForecast(
            item.date,
            item.day.condition.text,
            item.day.maxtemp_c,
            item.day.mintemp_c,
            item.day.maxwind_kph,
        ));
}
