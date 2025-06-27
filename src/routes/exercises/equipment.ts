import getExerciseData from '@/utils/getExerciseData';
import isBasicSubscriber from '@/utils/isBasicSubscriber';
import sortAndPaginate from '@/utils/sortAndPaginate';
import defaultQuery, { type DefaultQuery } from '@/validations/defaultQuery';
import equipmentParam, { type EquipmentParam } from '@/validations/equipmentParam';
import { Router } from 'express';
import { matchedData, validationResult } from 'express-validator';

const equipmentRoute = Router();

equipmentRoute.get('/equipment/:equipment', ...equipmentParam, ...defaultQuery, (req, res) => {
    try {
        const result = validationResult(req);

        if (!result.isEmpty()) {
            res.status(422).send({
                errors: result.array(),
            });
            return;
        }

        const queryData = matchedData<DefaultQuery & EquipmentParam>(req);
        const filteredData = getExerciseData().filter((exercise) => exercise.equipment === queryData.equipment);

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

export default equipmentRoute;
