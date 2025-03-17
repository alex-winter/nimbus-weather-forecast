import { Locations } from '../../../../src/services/database/locations';
import { databaseConnection } from '../../../../src/services/database/database-connection';

describe('Locations Integration Test', () => {
    let sut: Locations;

    beforeAll(async () => {
        sut = new Locations();
        await databaseConnection.raw('SET FOREIGN_KEY_CHECKS = 0;');
        await databaseConnection('locations').truncate();
        await databaseConnection.raw('SET FOREIGN_KEY_CHECKS = 1;');
    });

    afterAll(async () => {
        await databaseConnection.destroy();
    });

    beforeEach(async () => {
        // Ensure the locations table is truncated before each test
        await databaseConnection.raw('SET FOREIGN_KEY_CHECKS = 0;');
        await databaseConnection('locations').truncate();
        await databaseConnection.raw('SET FOREIGN_KEY_CHECKS = 1;');
    });

    it('should insert locations into the database', async () => {
        const locations = [
            { name: 'Paris', country: 'France', latitude: 48.8566, longitude: 2.3522 },
            { name: 'Berlin', country: 'Germany', latitude: 52.52, longitude: 13.405 },
        ];

        await sut.insert(locations);

        const storedLocations = await databaseConnection('locations').select('*');

        expect(storedLocations).toHaveLength(2);
        expect(storedLocations).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ name: 'Paris', country: 'France' }),
                expect.objectContaining({ name: 'Berlin', country: 'Germany' }),
            ])
        );
    });

    it('should not insert duplicate locations', async () => {
        const locations = [
            { name: 'New York', country: 'USA', latitude: 40.7128, longitude: -74.006 },
            { name: 'York', country: 'UK', latitude: 53.9586, longitude: -1.0828 },
        ];

        // First insertion should succeed
        await sut.insert(locations);

        // Attempt to insert the same locations again
        await sut.insert(locations);

        // Verify that only unique locations were inserted
        const storedLocations = await databaseConnection('locations').select('*');
        expect(storedLocations).toHaveLength(2); // Should still be 2, not 4
    });

    it('should return matching locations from the database', async () => {
        await databaseConnection('locations').insert([
            { name: 'New York', country: 'USA', latitude: 40.7128, longitude: -74.006 },
            { name: 'York', country: 'UK', latitude: 53.9586, longitude: -1.0828 },
        ]);

        const result = await sut.search('York');

        expect(result).toHaveLength(2);
        expect(result).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ name: 'New York', country: 'USA' }),
                expect.objectContaining({ name: 'York', country: 'UK' }),
            ])
        );
    });

    it('should return an empty array when no match is found', async () => {
        const result = await sut.search('NonExistentCity');
        expect(result).toEqual([]);
    });
});
