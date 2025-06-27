import { type Exercise } from '@/types/Exercise';
import { type SortMethod, SortOrder } from '@/types/Sort';

type Args = {
    sortMethod: SortMethod;
    sortOrder: SortOrder;
    offset: number;
    limit: number;
    exercises: Exercise[];
};

const sortAndPaginate = ({ sortMethod, sortOrder, offset, limit, exercises }: Args) => {
    const sortedData = exercises.sort((a, b) =>
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
