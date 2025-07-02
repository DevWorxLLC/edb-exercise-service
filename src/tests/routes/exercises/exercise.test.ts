import ExpressConfig from '@/express.config';
import { describe, expect, it } from 'bun:test';
import supertest from 'supertest';

const request = supertest(await ExpressConfig());

describe('GET /exercises/exercise/:id', () => {
    it('should return 200 and the exercise object for a valid id', async () => {
        // Replace '0001' with a known valid exercise id in your dataset
        const res = await request.get('/exercises/exercise/0001');
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('id', '0001');
        expect(res.body).toHaveProperty('name');
        expect(res.body).toHaveProperty('bodyPart');
        expect(res.body).toHaveProperty('equipment');
    });

    it('should return 422 for an unknown exercise id', async () => {
        const res = await request.get('/exercises/exercise/unknownid');
        expect(res.status).toBe(422);
    });

    it('should return application/json content-type', async () => {
        const res = await request.get('/exercises/exercise/0001');
        expect(res.headers['content-type']).toContain('application/json');
    });

    it('should not allow POST method', async () => {
        const res = await request.post('/exercises/exercise/0001');
        expect(res.status).toBeGreaterThanOrEqual(400);
    });

    it('should return 400 or 404 for missing id parameter', async () => {
        const res = await request.get('/exercises/exercise/');
        expect([400, 404]).toContain(res.status);
    });
});
