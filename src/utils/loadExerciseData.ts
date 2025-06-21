import cache from '@/services/cache';

export const exerciseDataCacheKey = 'exerciseData';

const loadExerciseData = async () => {
    const exerciseData = await Bun.file('exerciseData_final.json').json();

    cache.set(exerciseDataCacheKey, exerciseData);

    console.log('>> Cache loaded <<');
};

export default loadExerciseData;
