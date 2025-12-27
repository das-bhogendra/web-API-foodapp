'use server';

import { LoginPayload, RegisterPayload } from '../types/auth.types';

export async function loginService(data: LoginPayload) {
  console.log('LOGIN', data);
  return { success: true };
}

export async function registerService(data: RegisterPayload) {
  console.log('REGISTER', data);
  return { success: true };
}
