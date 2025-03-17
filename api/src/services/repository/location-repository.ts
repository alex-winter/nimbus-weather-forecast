import {Location} from '../../models/location'
import {databaseConnection} from '../database-connection'

export class LocationRepository {
    public async search(query: string): Promise<Location[]>
    {
        try {
            return await databaseConnection('locations')
                .where('name', 'like', `%${query}%`)
                .orWhere('country', 'like', `%${query}%`)
                .limit(6);
        } catch (error) {
            console.error('Database query failed:', error);

            /**
             * Something like sentry here
             */

            return [];
        }
    }
}
