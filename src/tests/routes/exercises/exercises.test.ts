import ExpressConfig from '@/express.config';
import { describe, expect, it } from 'bun:test';
import supertest from 'supertest';

const request = supertest(await ExpressConfig());

describe('GET /exercises', () => {
    it('should return 200 and a list of exercises', async () => {
        const res = await request.get('/exercises');
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
        // Optionally check structure of an exercise object
        if (res.body.length > 0) {
            expect(res.body[0]).toHaveProperty('id');
            expect(res.body[0]).toHaveProperty('name');
            expect(res.body[0]).toHaveProperty('bodyPart');
            expect(res.body[0]).toHaveProperty('equipment');
        }
    });

    it('should return application/json content-type', async () => {
        const res = await request.get('/exercises');
        expect(res.headers['content-type']).toContain('application/json');
    });

    it('should not allow POST method', async () => {
        const res = await request.post('/exercises');
        expect(res.status).toBeGreaterThanOrEqual(400);
    });

    it('should return 404 for unknown route', async () => {
        const res = await request.get('/exercises/unknown');
        expect(res.status).toBe(404);
    });
});
