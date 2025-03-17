import {LocationRepository} from '../../../../src/services/repository/location-repository'
import {databaseConnection} from '../../../../src/services/database-connection'

describe('Locations Integration Test', () => {
    let sut: LocationRepository;

    beforeAll(async () => {
        sut = new LocationRepository();
        await databaseConnection('locations').truncate();
    });

    afterAll(async () => {
        await databaseConnection.destroy();
    });

    it('should return matching locations from the database', async () => {
        await databaseConnection('locations').insert([
            { id: 1, name: 'New York', country: 'USA', latitude: 40.7128, longitude: -74.006 },
            { id: 2, name: 'York', country: 'UK', latitude: 53.9586, longitude: -1.0828 },
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
