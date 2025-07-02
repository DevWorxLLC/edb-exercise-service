import ExpressConfig from '@/express.config';
import { describe, expect, it } from 'bun:test';
import supertest from 'supertest';

const request = supertest(await ExpressConfig());

describe('GET /exercises/equipment/:equipment', () => {
    it('should return 200 and a list of exercises for valid equipment', async () => {
        const res = await request.get('/exercises/equipment/dumbbell');
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
        if (res.body.length > 0) {
            expect(res.body[0]).toHaveProperty('id');
            expect(res.body[0]).toHaveProperty('name');
            expect(res.body[0]).toHaveProperty('equipment');
        }
    });

    it('should return 422 for unknown equipment', async () => {
        const res = await request.get('/exercises/equipment/unknownitem');
        expect(res.status).toBe(422);
    });

    it('should return application/json content-type', async () => {
        const res = await request.get('/exercises/equipment/dumbbell');
        expect(res.headers['content-type']).toContain('application/json');
    });

    it('should not allow POST method', async () => {
        const res = await request.post('/exercises/equipment/dumbbell');
        expect(res.status).toBeGreaterThanOrEqual(400);
    });

    it('should return 400 or 404 for missing equipment parameter', async () => {
        const res = await request.get('/exercises/equipment/');
        expect([400, 404]).toContain(res.status);
    });
});
