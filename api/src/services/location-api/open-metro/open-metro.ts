import { config } from '../../../config';
import {LocationApi} from '../interface'

export class OpenMetroApi implements LocationApi
{
    constructor(private fetch: typeof global.fetch = global.fetch)
    {
    }

    public async search(query: string): Promise<any> {
        try {
            const queryParameters = new URLSearchParams({
                name: query,
                count: config.maxLocationResults.toString(),
            });

            const response = await this.fetch(
                `${config.geoLocationApi.search}?${queryParameters.toString()}`
            );

            if (!response.ok) {
                throw new Error('Failed to fetch data from external API');
            }

            const data = await response.json();

            return data.results;
        } catch (error) {
            console.error("Error fetching locations:", error);

            /**
             * Could log these to something such as Sentry
             */

            return [];
        }
    }
}
