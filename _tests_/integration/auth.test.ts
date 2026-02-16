import request from 'supertest';
import app from '../../src/app';
import { UserModel } from '../../src/models/user.model';

describe('Authentication Integration Tests', () => {

  const testUser = {
    email: 'test@example.com',
    password: 'Test@1234',
    confirmPassword: 'Test@1234',
    username: 'testuser',
    fullName: 'Test User',
  };

  beforeAll(async () => {
    await UserModel.deleteMany({ email: testUser.email });
  });

  afterAll(async () => {
    await UserModel.deleteMany({ email: testUser.email });
  });

  describe('POST /api/auth/register', () => {

    test('should register a new user successfully', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send(testUser);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('message', 'Register success');
      expect(response.body).toHaveProperty('data');
    });

  });

});
