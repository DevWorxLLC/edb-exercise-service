import getExerciseData from '@/utils/getExerciseData';
import isBasicSubscriber from '@/utils/isBasicSubscriber';
import sortAndPaginate from '@/utils/sortAndPaginate';
import defaultQuery from '@/validations/defaultQuery';
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

        const data = matchedData(req);
        const exerciseData = getExerciseData();

        if (isBasicSubscriber(req)) {
            const basicData = sortAndPaginate({
                sortMethod: data.sortMethod,
                sortOrder: data.sortOrder,
                offset: data.offset,
                limit: 10,
                exercises: exerciseData,
            });

            res.json(basicData);
            return;
        }

        const premiumData = sortAndPaginate({
            sortMethod: data.sortMethod,
            sortOrder: data.sortOrder,
            offset: data.offset,
            limit: data.limit,
            exercises: exerciseData,
        });

        res.status(200).json(premiumData);
    } catch (error) {
        res.status(500).send(error);
    }
});

export default exercisesRoute;
