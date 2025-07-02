import getExerciseData from '@/utils/getExerciseData';
import exerciseParam, { type ExerciseParam } from '@/validations/exerciseParam';
import { Router } from 'express';
import { matchedData, validationResult } from 'express-validator';

const exerciseRoute = Router();

exerciseRoute.get('/exercise/:id', ...exerciseParam, (req, res) => {
    try {
        const result = validationResult(req);

        if (!result.isEmpty()) {
            res.status(422).json({
                errors: result.array(),
            });
            return;
        }

        const data = matchedData<ExerciseParam>(req);
        const [exercise] = getExerciseData().filter((exercise) => exercise.id === data.id);

        res.status(200).json(exercise);
    } catch (error) {
        res.status(500).json(error);
    }
});

export default exerciseRoute;
