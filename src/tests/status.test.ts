import ExpressConfig from '@/express.config';
import { expect, it } from 'bun:test';
import supertest from 'supertest';

const request = supertest(await ExpressConfig());

it('/status', async () => {
    const res = await request.get('/status');

    expect(res.status).toBe(200);
    expect(res.body.status).toBe('online');
});
