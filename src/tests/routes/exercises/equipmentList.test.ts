import ExpressConfig from '@/express.config';
import { describe, expect, it } from 'bun:test';
import supertest from 'supertest';

const request = supertest(await ExpressConfig());

describe('GET /exercises/equipmentList', () => {
    it('should return 200 and a list of equipment', async () => {
        const res = await request.get('/exercises/equipmentList');
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
        expect(typeof res.body[0]).toBe('string');
    });

    it('should return application/json content-type', async () => {
        const res = await request.get('/exercises/equipmentList');
        expect(res.headers['content-type']).toContain('application/json');
    });

    it('should not allow POST method', async () => {
        const res = await request.post('/exercises/equipmentList');
        expect(res.status).toBeGreaterThanOrEqual(400);
    });

    it('should return 404 for unknown route', async () => {
        const res = await request.get('/exercises/equipmentList/unknown');
        expect(res.status).toBe(404);
    });
});
