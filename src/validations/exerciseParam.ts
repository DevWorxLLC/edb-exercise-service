import { param } from 'express-validator';

export type ExerciseParam = {
    id: string;
};

const exerciseParam = [
    param('id').isString().isLength({
        min: 4,
        max: 4,
    }),
];

export default exerciseParam;
