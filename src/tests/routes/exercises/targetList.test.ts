import ExpressConfig from '@/express.config';
import { describe, expect, it } from 'bun:test';
import supertest from 'supertest';

const request = supertest(await ExpressConfig());

describe('GET /exercises/targetList', () => {
    it('should return 200 and a list of targets', async () => {
        const res = await request.get('/exercises/targetList');
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
        expect(typeof res.body[0]).toBe('string');
    });

    it('should return application/json content-type', async () => {
        const res = await request.get('/exercises/targetList');
        expect(res.headers['content-type']).toContain('application/json');
    });

    it('should not allow POST method', async () => {
        const res = await request.post('/exercises/targetList');
        expect(res.status).toBeGreaterThanOrEqual(400);
    });

    it('should return 404 for unknown route', async () => {
        const res = await request.get('/exercises/targetList/unknown');
        expect(res.status).toBe(404);
    });
});
