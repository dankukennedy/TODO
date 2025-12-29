import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import type { Application, Response, Request } from 'express';
import connectDB from './db/dbConnect.ts';
import taskRoutes from './route/taskRoute.ts';
import { globalErrorHandler } from './middleware/errorMiddleware.ts';


dotenv.config();

const app: Application = express();
app.use(express.json());

const corsOptions = {
  origin: 'http://localhost:5173', // Your Frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, // Allow cookies if needed
};
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));

connectDB();
app.get('/', (req: Request, res: Response) => {
    res.send('API is running...');
});

app.use('/api', taskRoutes);
app.use(globalErrorHandler);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`🌐 Frontend URL: ${process.env.FRONTEND_URL} || 'http://localhost:5173'}`);
 });