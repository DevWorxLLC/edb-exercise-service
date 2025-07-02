import { type Exercise } from '@/types/Exercise';
import getExerciseData from '@/utils/getExerciseData';
import isBasicSubscriber from '@/utils/isBasicSubscriber';
import sortAndPaginate from '@/utils/sortAndPaginate';
import defaultQuery, { type DefaultQuery } from '@/validations/defaultQuery';
import nameParam, { type NameParam } from '@/validations/nameParam';
import { Router } from 'express';
import { matchedData, validationResult } from 'express-validator';

const nameRoute = Router();

nameRoute.get('/name/:name', ...defaultQuery, ...nameParam, (req, res) => {
    try {
        const result = validationResult(req);

        if (!result.isEmpty()) {
            res.status(422).json({
                errors: result.array(),
            });
            return;
        }

        const data = matchedData<DefaultQuery & NameParam>(req);

        const exerciseData = getExerciseData();
        const matches: Exercise[] = [];

        for (let j = 0; j < exerciseData.length; j++) {
            const exerciseName = exerciseData[j].name;
            const exercise = exerciseData[j];
            const isMatch = exerciseName.includes(data.name);

            if (isMatch) {
                matches.push(exercise);
            }
        }

        const sortedData = sortAndPaginate({
            queryData: data,
            exercises: matches,
            isBasicSubscriber: isBasicSubscriber(req),
        });

        res.status(200).json(sortedData);
    } catch (error) {
        res.status(500).json(error);
    }
});

export default nameRoute;
