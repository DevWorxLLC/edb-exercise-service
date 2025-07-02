import { Router } from 'express';
import bodyPartRoute from './bodyPart';
import bodyPartListRoute from './bodyPartList';
import equipmentRoute from './equipment';
import equipmentListRoute from './equipmentList';
import exerciseRoute from './exercise';
import exercisesRoute from './exercises';
import nameRoute from './name';
import targetRoute from './target';
import targetListRoute from './targetList';

const exercisesRouter = Router();

exercisesRouter.use(exercisesRoute);
exercisesRouter.use(bodyPartListRoute);
exercisesRouter.use(equipmentListRoute);
exercisesRouter.use(targetListRoute);
exercisesRouter.use(bodyPartRoute);
exercisesRouter.use(equipmentRoute);
exercisesRouter.use(nameRoute);
exercisesRouter.use(exerciseRoute);
exercisesRouter.use(targetRoute);

export { exercisesRouter };
