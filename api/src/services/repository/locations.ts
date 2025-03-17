import {Location} from '../../models/location'
import {knex} from 'knex'

export class Locations {
    public async search(query: string): Promise<Location[]>
    {
        try {
            return await knex('locations')
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
