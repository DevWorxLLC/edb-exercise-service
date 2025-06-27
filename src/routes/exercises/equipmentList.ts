import equipmentList from '@/constants/equipmentList';
import { Router } from 'express';

const equipmentListRoute = Router();

equipmentListRoute.get('/equipmentList', (_, res) => {
    try {
        res.status(200).json(equipmentList);
    } catch (error) {
        res.status(500).send(error);
    }
});

export default equipmentListRoute;
