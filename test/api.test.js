const request = require('supertest');
const app = require('../app'); // Pastikan path ini sesuai

describe('API Testing', () => {
  test('GET /api/hello should respond with Hello, world!', async () => {
    const response = await request(app).get('/api/hello');
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Hello, world!');
  });

  test('POST /api/hello should respond with personalized message', async () => {
    const response = await request(app)
      .post('/api/hello')
      .send({ name: 'Alice' });
    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Hello, Alice!');
  });

  test('POST /api/hello should return 400 if name is missing', async () => {
    const response = await request(app)
      .post('/api/hello')
      .send({});
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Name is required');
  });

  test('PUT /api/hello should respond with update confirmation', async () => {
    const response = await request(app).put('/api/hello');
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Updated successfully');
  });

  test('DELETE /api/hello should respond with delete confirmation', async () => {
    const response = await request(app).delete('/api/hello');
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Deleted successfully');
  });
});
