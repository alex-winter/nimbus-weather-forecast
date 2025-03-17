import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
    origin: '*', // Ideally this would come from server
    methods: 'GET',
}));
app.use(express.json());

// @ts-ignore
app.get('/api/locations', async (request: Request, response: Response): Response => {

    return response.json({test: 'hello I work'});
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
