import bodyPartList from '@/constants/bodyPartList';
import { param } from 'express-validator';

export type BodyPartParam = {
    bodyPart: keyof typeof bodyPartList;
};

const bodyPartParam = [param('bodyPart').isIn(bodyPartList)];

export default bodyPartParam;
