import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import type { Application, Response, Request } from 'express';

dotenv.config();

const app: Application = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
    res.send('API is running...');
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});