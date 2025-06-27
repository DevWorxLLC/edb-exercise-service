/* eslint-disable @typescript-eslint/consistent-type-assertions */
/* eslint-disable object-curly-newline */
import isBasicSubscriber, { type ExpressRequest } from '@/utils/isBasicSubscriber';
import { describe, expect, it } from 'bun:test';

describe('isBasicSubscriber', () => {
    it('Should return true when header indicates basic subscriber', () => {
        const req = {
            headers: {
                'x-rapidapi-subscription': 'BASIC',
            },
        } as unknown as ExpressRequest;

        const res = isBasicSubscriber(req);

        expect(res).toBeTrue();
    });

    it('Should return false when header indicates basic subscriber', () => {
        const req = {
            headers: {
                'x-rapidapi-subscription': 'PRO',
            },
        } as unknown as ExpressRequest;

        const res = isBasicSubscriber(req);

        expect(res).toBeFalse();
    });
});
