import {mapToModel} from './open-metro/map-to-model'
import {uniqueLocations} from './unique-locations'
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

        if (existingLocations.length) {
            return existingLocations
        } else {
            const rawData = await this.locationApi.search(query);
            const locations = mapToModel(rawData)

            this.locationDatabase.insert(locations)

            return uniqueLocations(locations)
        }
    }
}
