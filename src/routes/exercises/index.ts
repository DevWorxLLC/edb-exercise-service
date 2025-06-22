import { Router } from 'express';
import exercisesRoute from './exercises';

const exercisesRouter = Router();

exercisesRouter.use(exercisesRoute);

export { exercisesRouter };
