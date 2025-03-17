import express, { Request, Response } from 'express';
import cors from 'cors';
import {OpenMetroApi} from './services/location-api/open-metro/open-metro'
import {Api} from './services/location-api/api'
import {QueryParameters} from './types'
import {config} from './config'

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
    origin: '*', // Ideally this would come from server
    methods: 'GET',
}));
app.use(express.json());

// @ts-ignore
app.get('/api/locations', async (request: Request, response: Response): Response => {
    const queryParameters: QueryParameters = request.query;
    const search = queryParameters.search;

    if (typeof search !== 'string' || search.length < config.minLocationSearch) {
        return response.status(400)
            .json({error: 'Invalid Search, must have query parameter "search" with at least 2 characters'})
    }

    const locationsApi = new Api(new OpenMetroApi());

    return response.json({
        locations: await locationsApi.search(search),
    });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
