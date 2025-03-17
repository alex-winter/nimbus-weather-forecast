import express, { Request, Response } from 'express';
import cors from 'cors';
import {OpenMetroApi} from './services/location-api/open-metro/open-metro'
import {Api} from './services/location-api/api'

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
    origin: '*', // Ideally this would come from server
    methods: 'GET',
}));
app.use(express.json());

// @ts-ignore
app.get('/api/locations', async (request: Request, response: Response): Response => {

    const locationsApi = new Api(new OpenMetroApi())

    return response.json({
        locations: await locationsApi.search('Eastleigh')
    });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
