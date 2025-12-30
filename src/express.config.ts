import compression from 'compression';
import 'dotenv/config';
import express, { type Application } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { exercisesRouter } from './routes/exercises';
import statusRoute from './routes/status';
import loadExerciseData from './utils/loadExerciseData';

const ExpressConfig = (): Application => {
    const app = express();

    loadExerciseData();

    app.use(compression());
    app.use(
        express.urlencoded({
            extended: true,
        }),
    );
    app.use(express.json());

    app.use(helmet());
    app.use(morgan('dev'));

    app.use(statusRoute);
    app.use('/exercises', exercisesRouter);

    return app;
};
export default ExpressConfig;
