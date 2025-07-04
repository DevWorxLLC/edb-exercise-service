import ExpressConfig from '@/express.config';
import { describe, expect, it } from 'bun:test';
import supertest from 'supertest';

const request = supertest(await ExpressConfig());

describe('GET /status', () => {
    it('should return 200 and status online', async () => {
        const res = await request.get('/status');
        expect(res.status).toBe(200);
        expect(res.body.status).toBe('online');
    });

    it('should return application/json content-type', async () => {
        const res = await request.get('/status');
        expect(res.headers['content-type']).toContain('application/json');
    });

    it('should not allow POST method', async () => {
        const res = await request.post('/status');
        expect(res.status).toBeGreaterThanOrEqual(400);
    });

    it('should return only the status property in body', async () => {
        const res = await request.get('/status');
        expect(Object.keys(res.body)).toEqual(['status']);
    });

    it('should return 404 for unknown route', async () => {
        const res = await request.get('/unknown');
        expect(res.status).toBe(404);
    });
});
