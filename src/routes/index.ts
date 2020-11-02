import { Router } from 'express';

import appointmentsRoutes from './appointments.routes';
import usersRoutes from './users.routes';

const router = Router();

router.use('/appointments', appointmentsRoutes);
router.use('/users', usersRoutes);

export default router;