import {Location} from '../../../models/location'

export function mapToModel(data: any): Location[] {
    if (!Array.isArray(data)) return [];

    return data
        .filter((item): item is Location =>
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
