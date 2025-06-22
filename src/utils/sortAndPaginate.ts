import cache from '@/services/cache';
import { type Exercise } from '@/types/Exercise';
import { type SortMethod, SortOrder } from '@/types/Sort';
import { exerciseDataCacheKey } from './loadExerciseData';

type Args = {
    sortMethod: SortMethod;
    sortOrder: SortOrder;
    offset: number;
    limit: number;
};

const sortAndPaginate = ({ sortMethod, sortOrder, offset, limit }: Args) => {
    const exerciseData = cache.get<Exercise[]>(exerciseDataCacheKey)!;

    const sortedData = exerciseData.sort((a, b) =>
        sortOrder === SortOrder.ascending
            ? a[sortMethod].localeCompare(b[sortMethod])
            : b[sortMethod].localeCompare(a[sortMethod]),
    );

    if (limit === 0) {
        return sortedData;
    }

    const start = offset;
    const end = start + limit;

    return sortedData.slice(start, end);
};

export default sortAndPaginate;
