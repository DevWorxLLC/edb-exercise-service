import { param } from 'express-validator';

export type NameParam = {
    name: string;
};

const nameParam = [param('name').notEmpty().isString()];

export default nameParam;
