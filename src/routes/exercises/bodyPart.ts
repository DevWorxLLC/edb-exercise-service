import getExerciseData from '@/utils/getExerciseData';
import isBasicSubscriber from '@/utils/isBasicSubscriber';
import sortAndPaginate from '@/utils/sortAndPaginate';
import bodyPartParam, { type BodyPartParam } from '@/validations/bodyPart';
import defaultQuery, { type DefaultQuery } from '@/validations/defaultQuery';
import { Router } from 'express';
import { matchedData, validationResult } from 'express-validator';

const bodyPartRoute = Router();

bodyPartRoute.get('/bodyPart/:bodyPart', ...bodyPartParam, ...defaultQuery, (req, res) => {
    try {
        const result = validationResult(req);

        if (!result.isEmpty()) {
            res.status(422).send({
                errors: result.array(),
            });
            return;
        }

        const queryData = matchedData<DefaultQuery & BodyPartParam>(req);
        const filteredData = getExerciseData().filter((exercise) => exercise.bodyPart === queryData.bodyPart);

        const sortedData = sortAndPaginate({
            queryData,
            exercises: filteredData,
            isBasicSubscriber: isBasicSubscriber(req),
        });

        res.status(200).json(sortedData);
    } catch (error) {
        res.status(500).send(error);
    }
});

export default bodyPartRoute;
