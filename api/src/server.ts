import express from 'express';
import cors from 'cors';
import {config} from './config'
import {locationsRequestHandler} from './request-handlers/locations-request-handler'
import {fiveDayForecastRequestHandler} from './request-handlers/fiveDayForecastRequestHandler'

const app = express();
const port = 3000;

app.use(cors({
    origin: config.corsAllowOrigin,
    methods: 'GET',
}));
app.use(express.json());

// @ts-ignore
app.get('/api/locations', locationsRequestHandler);

// @ts-ignore
app.get('/api/5-day-forecast', fiveDayForecastRequestHandler);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
