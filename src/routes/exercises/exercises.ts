import getExerciseData from '@/utils/getExerciseData';
import isBasicSubscriber from '@/utils/isBasicSubscriber';
import sortAndPaginate from '@/utils/sortAndPaginate';
import defaultQuery, { type DefaultQuery } from '@/validations/defaultQuery';
import { Router } from 'express';
import { matchedData, validationResult } from 'express-validator';

const exercisesRoute = Router();

exercisesRoute.get('/', ...defaultQuery, (req, res) => {
    try {
        const result = validationResult(req);

        if (!result.isEmpty()) {
            res.status(422).send({
                errors: result.array(),
            });
            return;
        }

        const queryData = matchedData<DefaultQuery>(req);
        const exerciseData = getExerciseData();

        const returnData = sortAndPaginate({
            queryData,
            exercises: exerciseData,
            isBasicSubscriber: isBasicSubscriber(req),
        });

        res.status(200).json(returnData);
    } catch (error) {
        res.status(500).send(error);
    }
});

export default exercisesRoute;
