import { SortMethod, SortOrder } from '@/types/Sort';
import sortAndPaginate from '@/utils/sortAndPaginate';
import { describe, expect, it } from 'bun:test';
import exerciseData from '../../../exerciseData_final.json';

const exercises = exerciseData;
describe('sortAndPaginate', () => {
    it('sorts by name ascending', () => {
        const result = sortAndPaginate({
            queryData: {
                sortMethod: SortMethod.name,
                sortOrder: SortOrder.ascending,
                offset: 0,
                limit: 5,
            },
            exercises: [...exercises],
            isBasicSubscriber: false,
        });
        expect(result.map((e) => e.name)).toEqual([
            '3/4 sit-up',
            '45° side bend',
            'air bike',
            'all fours squad stretch',
            'alternate heel touchers',
        ]);
    });

    it('sorts by category descending', () => {
        const result = sortAndPaginate({
            queryData: {
                sortMethod: SortMethod.category,
                sortOrder: SortOrder.descending,
                offset: 0,
                limit: 3,
            },
            exercises: [...exercises],
            isBasicSubscriber: false,
        });
        expect(result.map((e) => e.category).slice(0, 3)).toEqual(['stretching', 'stretching', 'stretching']);
    });

    it('applies offset and limit', () => {
        const result = sortAndPaginate({
            queryData: {
                sortMethod: SortMethod.name,
                sortOrder: SortOrder.ascending,
                offset: 2,
                limit: 4,
            },
            exercises: [...exercises],
            isBasicSubscriber: false,
        });
        expect(result.length).toBe(4);
        expect(result[0].name).toBe('air bike');
    });

    it('limits to 10 for basic subscribers if limit > 10', () => {
        const result = sortAndPaginate({
            queryData: {
                sortMethod: SortMethod.name,
                sortOrder: SortOrder.ascending,
                offset: 0,
                limit: 20,
            },
            exercises: [...exercises],
            isBasicSubscriber: true,
        });
        expect(result.length).toBe(10);
    });

    it('returns all sorted if limit is 0', () => {
        const result = sortAndPaginate({
            queryData: {
                sortMethod: SortMethod.name,
                sortOrder: SortOrder.ascending,
                offset: 0,
                limit: 0,
            },
            exercises: [...exercises],
            isBasicSubscriber: false,
        });
        expect(result.length).toBe(exercises.length);
        expect(result[0].name).toBe('3/4 sit-up');
    });

    it('limits to 10 for basic subscribers if limit < 1', () => {
        const result = sortAndPaginate({
            queryData: {
                sortMethod: SortMethod.name,
                sortOrder: SortOrder.ascending,
                offset: 0,
                limit: -5,
            },
            exercises: [...exercises],
            isBasicSubscriber: true,
        });
        expect(result.length).toBe(10);
    });
});
