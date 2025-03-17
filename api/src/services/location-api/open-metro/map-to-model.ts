import {ApiLocation} from '../data-model'

export function mapToModel(data: any): ApiLocation[] {
    if (!Array.isArray(data)) return [];

    return data
        .filter((item): item is ApiLocation =>
            typeof item === 'object' &&
            item !== null &&
            typeof item.name === 'string' &&
            typeof item.country === 'string' &&
            typeof item.longitude === 'number' &&
            typeof item.latitude === 'number'
        )
        .map(item => ({
            name: item.name,
            country: item.country,
            longitude: item.longitude,
            latitude: item.latitude,
        }));
}
