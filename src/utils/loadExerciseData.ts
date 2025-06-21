import cache from '@/services/cache';

const loadExerciseData = async () => {
    const exerciseData = (await Bun.file('exerciseData_final.json').json()) as unknown[];

    cache.set('exerciseData', exerciseData);

    console.log('>> Cache loaded <<');
};

export default loadExerciseData;
