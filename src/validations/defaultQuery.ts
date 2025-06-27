import { query } from 'express-validator';

const defaultQuery = [
    query('offset').default(0).isInt().toInt(),
    query('limit').default(10).isInt().toInt(),
    query('sortMethod').default('id').isIn(['bodyPart', 'equipment', 'id', 'name', 'target', 'difficulty', 'category']),
    query('sortOrder').default('ascending').isIn(['ascending', 'descending']),
    query('rapidapi-key').optional(),
];

export default defaultQuery;
