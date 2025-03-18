import {Location} from '../models/location'

export function uniqueLocations(locations: Location[]): Location[] {
    const uniqueLocationsMap = new Map<string, Location>();

    for (const location of locations) {
        const key = `${location.name}-${location.country}`;
        if (!uniqueLocationsMap.has(key)) {
            uniqueLocationsMap.set(key, location);
        }
    }

    return Array.from(uniqueLocationsMap.values());
}
