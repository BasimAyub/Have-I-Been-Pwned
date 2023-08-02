import cors from 'cors';
import dotenv from 'dotenv';
import express, { Application } from 'express';

import { breacheRoutes } from './breaches/breaches.routes';

dotenv.config();

const app: Application = express();
const port: string = process.env.APP_PORT || '8080';

app.use(express.json());
app.use(cors());

app.use('/breaches', breacheRoutes);

const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export { server, app };
