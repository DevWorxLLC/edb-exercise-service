import bodyPartParam from '@/validations/bodyPart';
import { Router } from 'express';
import { matchedData, validationResult } from 'express-validator';

const bodyPartRoute = Router();

bodyPartRoute.get('/bodyPart/:bodyPart', bodyPartParam, (req, res) => {
    try {
        const result = validationResult(req);

        if (!result.isEmpty()) {
            res.status(422).send({
                errors: result.array(),
            });
            return;
        }

        const data = matchedData(req);

        res.status(200).json(data.bodyPart);
    } catch (error) {
        res.status(500).send(error);
    }
});

export default bodyPartRoute;
