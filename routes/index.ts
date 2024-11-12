import express, { Router } from 'express';
import zoneRouter from './zone';
// import cameraRouter from './camera';

const router: Router = express.Router();

// Combine userRouter, postRouter, and protectedRouter
router.use('/zone', zoneRouter);
// router.use('/camera', cameraRouter);

export default router;
