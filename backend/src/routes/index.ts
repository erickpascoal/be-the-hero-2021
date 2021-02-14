import { Router } from 'express';
import ongRoutes from './ong.routes';
import incidentRoutes from './incident.routes';
import sessionRoutes from './session.routes';

const router = Router();

router.use('/ongs', ongRoutes)
router.use('/incidents', incidentRoutes)
router.use('/sessions', sessionRoutes)

export default router;