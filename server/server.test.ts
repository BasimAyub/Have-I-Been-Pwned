import { app, server } from './server';
import request from 'supertest';

describe('App', () => {
  afterEach(async () => {
    await new Promise((resolve) => setTimeout(resolve, 5000)); // Delay for 5 seconds after each test case bcz API key responds after every 5 seconds
  }, 10000);

  // Test case for retrieving breaches for a valid email
  test('GET /breaches should return breaches for a valid email', async () => {
    const response = await request(app)
      .get('/breaches')
      .query({ email: 'asif@gmail.com' });
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  // Test case for missing email in the request
  test('GET /breaches should return 400 for missing email', async () => {
    const response = await request(app).get('/breaches');
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'Invalid email address' });
  });

  // Test case for invalid email format
  test('GET /breaches should return 400 for invalid email format', async () => {
    const response = await request(app)
      .get('/breaches')
      .query({ email: 'invalid-email' });
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'Invalid email address' });
  });

  // Test case for handling API error (404 Not Found)
  test('GET /breaches should return empty array for email without breaches', async () => {
    const response = await request(app)
      .get('/breaches')
      .query({ email: 'no-breaches@example.com' });
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  afterAll((done) => {
    server.close(done);
  });
});
