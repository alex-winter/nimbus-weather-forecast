import {ApiLocation} from './data-model'

export function uniqueLocations(locations: ApiLocation[]): ApiLocation[] {
    const uniqueLocationsMap = new Map<string, ApiLocation>();

    for (const location of locations) {
        const key = `${location.name}-${location.country}`;
        if (!uniqueLocationsMap.has(key)) {
            uniqueLocationsMap.set(key, location);
        }
    }

    return Array.from(uniqueLocationsMap.values());
}
