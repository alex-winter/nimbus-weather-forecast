import {config} from '../config'

export type LocationResult = {
  name: string;
  country: string;
  latitude: number;
  longitude: number;
};

/**
 * Fetches matching locations based on a search query and removes duplicates by name.
 *
 * @param query - The location name or postal code to search for.
 *
 * @returns Array of unique matching locations or null if an error occurs.
 */
export async function searchLocations(query: string): Promise<LocationResult[] | null> {
  try {
    const queryParameters = new URLSearchParams({
      search: query,
    });

    const response = await fetch(`${config.locationApiUrl}?${queryParameters.toString()}`);

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await response.json();

    return data.locations;
  } catch (error) {
    console.error("Error fetching locations:", error);

    /**
     * Something like sentry logging here
     */

    return null;
  }
}
