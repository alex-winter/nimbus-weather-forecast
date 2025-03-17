import {mapToModel} from './open-metro/map-to-model'
import {uniqueLocations} from './unique-locations'
import {Location} from '../../models/location'
import {LocationApi} from './interface'

export class Repository
{
    constructor(
        private readonly locationApi: LocationApi,
    )
    {
    }

    public async search(query: string): Promise<Location[]> {
        const rawData = await this.locationApi.search(query);
        const locations = mapToModel(rawData)

        return uniqueLocations(locations)
    }
}
