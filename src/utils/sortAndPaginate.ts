import { type Exercise } from '@/types/Exercise';
import { type SortMethod, SortOrder } from '@/types/Sort';

type Args = {
    queryData: {
        sortMethod: SortMethod;
        sortOrder: SortOrder;
        offset: number;
        limit: number;
    };
    exercises: Exercise[];
    isBasicSubscriber: boolean;
};

const sortAndPaginate = ({ queryData, exercises, isBasicSubscriber }: Args) => {
    const { sortOrder, sortMethod, limit: queryLimit, offset } = queryData;
    const basicLimit = queryLimit < 1 || queryLimit > 10 ? 10 : queryLimit;

    const limit = isBasicSubscriber ? basicLimit : queryLimit;

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
