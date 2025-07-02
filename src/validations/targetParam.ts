import type equipmentList from '@/constants/equipmentList';
import targetList from '@/constants/targetList';
import { param } from 'express-validator';

export type TargetParam = {
    target: keyof typeof equipmentList;
};

const targetParam = [param('target').isIn(targetList)];

export default targetParam;
