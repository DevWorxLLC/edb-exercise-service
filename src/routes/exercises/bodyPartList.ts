import bodyPartList from '@/constants/bodyPartList';
import { Router } from 'express';

const bodyPartListRoute = Router();

bodyPartListRoute.get('/bodyPartList', (_, res) => {
    try {
        res.status(200).json(bodyPartList);
    } catch (error) {
        res.status(500).send(error);
    }
});

export default bodyPartListRoute;
