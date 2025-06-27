import bodyPartList from '@/constants/bodyPartList';
import { param } from 'express-validator';

const bodyPartParam = param('bodyPart').isIn(bodyPartList);

export default bodyPartParam;
