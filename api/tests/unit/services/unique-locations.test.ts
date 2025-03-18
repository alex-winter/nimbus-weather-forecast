import {uniqueLocations} from '../../../src/services/unique-locations'
import {Location} from '../../../src/models/location'

describe('uniqueLocations', () => {
    it('should return unique locations based on name and country', () => {
        const locations: Location[] = [
            new Location('Paris', 48.8566, 2.3522, 'France'),
            new Location('Berlin', 52.5200, 13.4050, 'Germany'),
            new Location('Paris', 48.8566, 2.3522, 'France'), // Duplicate
            new Location('Madrid', 40.4168, -3.7038, 'Spain'),
            new Location('Berlin', 52.5200, 13.4050, 'Germany'), // Duplicate
        ];

        const result = uniqueLocations(locations);

        expect(result).toHaveLength(3); // Expecting 3 unique locations
        expect(result).toEqual(expect.arrayContaining([
            expect.objectContaining({ name: 'Paris', country: 'France' }),
            expect.objectContaining({ name: 'Berlin', country: 'Germany' }),
            expect.objectContaining({ name: 'Madrid', country: 'Spain' }),
        ]));
    });

    it('should return an empty array when input is empty', () => {
        const result = uniqueLocations([]);
        expect(result).toEqual([]);
    });

    it('should handle locations with different cases', () => {
        const locations: Location[] = [
            new Location('Paris', 48.8566, 2.3522, 'France'),
            new Location('paris', 48.8566, 2.3522, 'france'), // Case variation
            new Location('Berlin', 52.5200, 13.4050, 'Germany'),
        ];

        const result = uniqueLocations(locations);

        expect(result).toHaveLength(3); // All should be considered unique
    });

    it('should handle locations with additional properties correctly', () => {
        const locations: Location[] = [
            new Location('Paris', 48.8566, 2.3522, 'France'),
            new Location('Paris', 48.8566, 2.3522, 'France'), // Duplicate
            new Location('Berlin', 52.5200, 13.4050, 'Germany'),
        ];

        const result = uniqueLocations(locations);

        expect(result).toHaveLength(2); // Expecting 2 unique locations
        expect(result).toEqual(expect.arrayContaining([
            expect.objectContaining({ name: 'Paris', country: 'France' }),
            expect.objectContaining({ name: 'Berlin', country: 'Germany' }),
        ]));
    });
});
