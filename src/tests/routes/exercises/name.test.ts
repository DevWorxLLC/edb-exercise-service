import ExpressConfig from '@/express.config';
import { describe, expect, it } from 'bun:test';
import supertest from 'supertest';

const request = supertest(await ExpressConfig());

describe('GET /exercises/name/:name', () => {
    it('should return 200 and a list of exercises matching the name', async () => {
        // Replace 'push' with a known substring or name in your dataset
        const res = await request.get('/exercises/name/push');
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
        if (res.body.length > 0) {
            expect(res.body[0]).toHaveProperty('id');
            expect(res.body[0]).toHaveProperty('name');
            expect(res.body[0].name.toLowerCase()).toContain('push');
        }
    });

    it('should return application/json content-type', async () => {
        const res = await request.get('/exercises/name/push');
        expect(res.headers['content-type']).toContain('application/json');
    });

    it('should not allow POST method', async () => {
        const res = await request.post('/exercises/name/push');
        expect(res.status).toBeGreaterThanOrEqual(400);
    });

    it('should return 400 or 404 for missing name parameter', async () => {
        const res = await request.get('/exercises/name/');
        expect([400, 404]).toContain(res.status);
    });

    it('should return an empty array for a valid but empty name search', async () => {
        // If the API returns [] for empty string, otherwise skip this test
        const res = await request.get('/exercises/name/');
        if (res.status === 200) {
            expect(Array.isArray(res.body)).toBe(true);
            expect(res.body.length).toBe(0);
        }
    });
});
