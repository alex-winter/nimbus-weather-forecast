import {Location} from '../../models/location'
import {databaseConnection} from './database-connection'

export class Locations
{
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

    public async insert(locations: Location[]): Promise<void> {
        if (!locations.length) {
            return;
        }

        try {
            await databaseConnection('locations').insert(locations);
        } catch (error) {
            console.error('Failed to insert locations:', error);

            /**
             * Something like sentry here
             */
        }
    }
}
