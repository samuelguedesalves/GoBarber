import { Router } from 'express';

import appointmentsRoutes from './appointments.routes';
import usersRoutes from './users.routes';
import sessionsRoutes from './sessions.routes';

const router = Router();

router.use('/appointments', appointmentsRoutes);
router.use('/users', usersRoutes);
router.use('/sessions', sessionsRoutes);

export default router;