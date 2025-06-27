import { Router } from 'express';
import bodyPartRoute from './bodyPart';
import bodyPartListRoute from './bodyPartList';
import equipmentListRoute from './equipmentList';
import exercisesRoute from './exercises';
import targetListRoute from './targetList';

const exercisesRouter = Router();

exercisesRouter.use(exercisesRoute);
exercisesRouter.use(bodyPartListRoute);
exercisesRouter.use(equipmentListRoute);
exercisesRouter.use(targetListRoute);
exercisesRouter.use(bodyPartRoute);

export { exercisesRouter };
