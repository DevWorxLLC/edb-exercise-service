import { type SortMethod, type SortOrder } from '@/types/Sort';
import { query } from 'express-validator';

export type DefaultQuery = {
    offset: number;
    limit: number;
    sortMethod: SortMethod;
    sortOrder: SortOrder;
    'rapidapi-key'?: string;
};

const defaultQuery = [
    query('offset').default(0).isInt().toInt(),
    query('limit').default(10).isInt().toInt(),
    query('sortMethod').default('id').isIn(['bodyPart', 'equipment', 'id', 'name', 'target', 'difficulty', 'category']),
    query('sortOrder').default('ascending').isIn(['ascending', 'descending']),
    query('rapidapi-key').optional(),
];

export default defaultQuery;
