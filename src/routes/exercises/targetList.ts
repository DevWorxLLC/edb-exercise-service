import targetList from '@/constants/targetList';
import { Router } from 'express';

const targetListRoute = Router();

targetListRoute.get('/targetList', (_, res) => {
    try {
        res.status(200).json(targetList);
    } catch (error) {
        res.status(500).send(error);
    }
});

export default targetListRoute;
