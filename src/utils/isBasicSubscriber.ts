import { type Request } from 'express';

const isBasicSubscriber = (
    req: Request<Record<string, any> | undefined, any, any, Record<string, any> | undefined, Record<string, any>>,
) => req.headers['x-rapidapi-subscription'] === 'BASIC';

export default isBasicSubscriber;
