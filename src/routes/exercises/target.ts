import getExerciseData from '@/utils/getExerciseData';
import isBasicSubscriber from '@/utils/isBasicSubscriber';
import sortAndPaginate from '@/utils/sortAndPaginate';
import defaultQuery, { type DefaultQuery } from '@/validations/defaultQuery';
import targetParam, { type TargetParam } from '@/validations/targetParam';
import { Router } from 'express';
import { matchedData, validationResult } from 'express-validator';

const targetRoute = Router();

targetRoute.get('/target/:target', ...defaultQuery, ...targetParam, (req, res) => {
    try {
        const result = validationResult(req);

        if (!result.isEmpty()) {
            res.status(422).json({
                errors: result.array(),
            });
            return;
        }

        const data = matchedData<DefaultQuery & TargetParam>(req);
        const targetData = getExerciseData().filter((exercise) => exercise.target === data.target);

        const sortedData = sortAndPaginate({
            queryData: data,
            exercises: targetData,
            isBasicSubscriber: isBasicSubscriber(req),
        });

        res.status(200).json(sortedData);
    } catch (error) {
        res.status(500).json(error);
    }
});

export default targetRoute;
