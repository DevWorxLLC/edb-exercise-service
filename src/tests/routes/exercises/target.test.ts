import ExpressConfig from '@/express.config';
import { describe, expect, it } from 'bun:test';
import supertest from 'supertest';

const request = supertest(await ExpressConfig());

describe('GET /exercises/target/:target', () => {
    it('should return 200 and a list of exercises for a valid target', async () => {
        // Replace 'biceps' with a known valid target in your dataset
        const res = await request.get('/exercises/target/biceps');
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
        if (res.body.length > 0) {
            expect(res.body[0]).toHaveProperty('id');
            expect(res.body[0]).toHaveProperty('name');
            expect(res.body[0]).toHaveProperty('target');
            expect(res.body[0].target.toLowerCase()).toContain('biceps');
        }
    });

    it('should return 422 for an unknown target', async () => {
        const res = await request.get('/exercises/target/unknownmuscle');
        expect(res.status).toBe(422);
    });

    it('should return application/json content-type', async () => {
        const res = await request.get('/exercises/target/biceps');
        expect(res.headers['content-type']).toContain('application/json');
    });

    it('should not allow POST method', async () => {
        const res = await request.post('/exercises/target/biceps');
        expect(res.status).toBeGreaterThanOrEqual(400);
    });

    it('should return 400 or 404 for missing target parameter', async () => {
        const res = await request.get('/exercises/target/');
        expect([400, 404]).toContain(res.status);
    });
});
