import { connectionDatabase } from '../src/database/mongodb';
import mongoose from 'mongoose';

beforeAll(async () => {
  await connectionDatabase();
});

afterAll(async () => {
  await mongoose.connection.close();
});
