import {Request, Response} from 'express'
import {QueryParameters} from '../types'
import {config} from '../config'
import {Repository as LocationRepository} from '../services/location-api/repository'
import {OpenMetroApi} from '../services/location-api/open-metro/open-metro'
import {Locations} from '../services/database/locations'

//@ts-ignore
export const locationsRequestHandler = async (request: Request, response: Response): Response => {
    const queryParameters: QueryParameters = request.query;
    const search = queryParameters.search;

    if (typeof search !== 'string' || search.length < config.minLocationSearch) {
        return response.status(400)
            .json({error: 'Invalid Search, must have query parameter "search" with at least 2 characters'})
    }

    const repository = new LocationRepository(new OpenMetroApi(), new Locations());

    const locations = await repository.search(search);

    return response.json({
        locations
    });
}
