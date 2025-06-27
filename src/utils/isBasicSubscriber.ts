import { type Request } from 'express';

export type ExpressRequest = Request<
    Record<string, any> | undefined,
    any,
    any,
    Record<string, any> | undefined,
    Record<string, any>
>;

const isBasicSubscriber = (req: ExpressRequest) => req.headers['x-rapidapi-subscription'] === 'BASIC';

export default isBasicSubscriber;
