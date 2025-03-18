import {mapToModel} from './open-metro/map-to-model'
import {uniqueLocations} from '../unique-locations'
import {Location} from '../../models/location'
import {LocationApi} from './interface'
import {Locations} from '../database/locations'

export class Repository
{
    constructor(
        private readonly locationApi: LocationApi,
        private readonly locationDatabase: Locations,
    )
    {
    }

    public async search(query: string): Promise<Location[]> {
        const existingLocations = await this.locationDatabase.search(query)

        if (existingLocations.length > 0) {
            return existingLocations
        } else {
            const rawData = await this.locationApi.search(query);
            const locations = mapToModel(rawData);
            const unique = uniqueLocations(locations);

            this.locationDatabase.insert(unique)

            return unique
        }
    }
}
