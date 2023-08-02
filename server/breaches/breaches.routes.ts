import { Router } from 'express';
import { getBreaches } from './breaches.controller';

const breacheRoutes = Router();

breacheRoutes.get('/', getBreaches);

export { breacheRoutes };
