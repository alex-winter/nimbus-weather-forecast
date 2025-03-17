import {LocationApi} from './interface'
import {mapToModel} from './open-metro/map-to-model'
import {uniqueLocations} from './unique-locations'
import {ApiLocation} from './data-model'

export class Api
{
    constructor(
        private readonly locationApi: LocationApi,
    )
    {
    }

    public async search(query: string): Promise<ApiLocation[]> {
        const rawData = await this.locationApi.search(query);
        const locations = mapToModel(rawData)

        return uniqueLocations(locations)
    }
}
