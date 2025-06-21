import cache from '@/services/cache';
import { type Exercise } from '@/types/Exercise';
import { exerciseDataCacheKey } from './loadExerciseData';

const getExerciseData = () => cache.get<Exercise[]>(exerciseDataCacheKey)!;

export default getExerciseData;
