import ExpressConfig from '@/express.config';
import { describe, expect, it } from 'bun:test';
import supertest from 'supertest';

const request = supertest(await ExpressConfig());

describe('GET /exercises/bodyPart/:bodyPart', () => {
    it('should return 200 and a list of exercises for a valid body part', async () => {
        const res = await request.get('/exercises/bodyPart/chest');
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        // Optionally check that at least one exercise is returned
        expect(res.body.length).toBeGreaterThan(0);
        // Optionally check structure of an exercise object
        if (res.body.length > 0) {
            expect(res.body[0]).toHaveProperty('id');
            expect(res.body[0]).toHaveProperty('name');
            expect(res.body[0]).toHaveProperty('bodyPart');
        }
    });

    it('should return 422 for an unknown body part', async () => {
        const res = await request.get('/exercises/bodyPart/unknownpart');
        expect(res.status).toBe(422);
    });

    it('should return application/json content-type', async () => {
        const res = await request.get('/exercises/bodyPart/chest');
        expect(res.headers['content-type']).toContain('application/json');
    });

    it('should not allow POST method', async () => {
        const res = await request.post('/exercises/bodyPart/chest');
        expect(res.status).toBeGreaterThanOrEqual(400);
    });

    it('should return 400 for missing bodyPart parameter', async () => {
        const res = await request.get('/exercises/bodyPart/');
        // Depending on router config, could be 404 or 400
        expect([400, 404]).toContain(res.status);
    });
});
