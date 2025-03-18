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
            const uniqueLocations = [];

            for (const location of locations) {
                const existing = await databaseConnection('locations')
                    .where('name', location.name)
                    .andWhere('country', location.country)
                    .first();

                if (!existing) {
                    uniqueLocations.push(location);
                }
            }

            if (uniqueLocations.length) {
                await databaseConnection('locations').insert(uniqueLocations);
            }
        } catch (error) {
            console.error('Failed to insert locations:', error);
            /**
             * Something like sentry here
             */
        }
    }
}
