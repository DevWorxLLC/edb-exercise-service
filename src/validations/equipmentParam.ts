import equipmentList from '@/constants/equipmentList';
import { param } from 'express-validator';

export type EquipmentParam = {
    equipment: keyof typeof equipmentList;
};

const equipmentParam = [param('equipment').isIn(equipmentList)];

export default equipmentParam;
