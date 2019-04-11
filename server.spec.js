const request = require('supertest');
const server = require('./server.js');
const db = require('./data.js');

describe('Users', () => {
  describe('GET /users', () => {
    it('should respond with 200', async () => {
      const response = await request(server).get('/users');
      expect(response.status).toBe(200);
    });

    it('should respond with JSON', async () => {
      const response = await request(server).get('/users');
      expect(response.type).toBe('application/json');
    });

    it('should return all records', async () => {
      const recordsCount = db.getAll().length;
      const response = await request(server).get('/users');
      console.log();
      expect(response.body.length).toEqual(recordsCount);
    });
  });

  describe('POST /users', () => {
    it('should successfully create a user', async () => {
      const recordsCount = db.getAll().length;
      const response = await request(server)
        .post('/users')
        .send({ username: 'Jill' });
      const newRecordsCount = db.getAll().length;
      expect(newRecordsCount).toBe(recordsCount + 1);
    });

    it('should respond with 201 when user is created', async () => {
      const response = await request(server)
        .post('/users')
        .send({ username: 'Jill' });
      expect(response.status).toBe(201);
    });

    it('should respond with JSON when user is created', async () => {
      const response = await request(server)
        .post('/users')
        .send({ username: 'Jill' });
      expect(response.type).toBe('application/json');
    });

    it('should return the created user when user is created', async () => {
      const response = await request(server)
        .post('/users')
        .send({ username: 'Jack' });
      expect(response.body.username).toBe('Jack');
      expect(typeof response.body.id).toBe('number');
    });

    it('should respond with 400 with invalid user', async () => {
      const response = await request(server)
        .post('/users')
        .send({ name: 'Jill' });
      expect(response.status).toBe(400);
    });
  });

  describe('DELETE /users', () => {
    it('should successfully delete a user', async () => {
      const recordsCount = db.getAll().length;
      const response = await request(server).delete('/users/5');
      const user = db.getById(5);
      const newRecordsCount = db.getAll().length;
      expect(newRecordsCount).toBe(recordsCount - 1);
      expect(user).toBe(null);
    });

    it('should respond with 204 when user is deleted', async () => {
      const response = await request(server).delete('/users/3');
      expect(response.status).toBe(204);
    });

    it('should respond with 404 when user does not exist', async () => {
      const response = await request(server).delete('/users/55');
      expect(response.status).toBe(404);
    });
  });

  describe('PUT /users', () => {
    it('should respond with 404', async () => {
      const response = await request(server).put('/users');
      expect(response.status).toBe(404);
    });
  });
});
