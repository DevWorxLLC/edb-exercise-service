import cache from '@/services/cache';
import fs from 'node:fs';

export const exerciseDataCacheKey = 'exerciseData';

const loadExerciseData = () => {
    const exerciseData = JSON.parse(fs.readFileSync('exerciseData_final.json', 'utf8'));

    cache.set(exerciseDataCacheKey, exerciseData);

    console.log('>> Cache loaded <<');
};

export default loadExerciseData;
