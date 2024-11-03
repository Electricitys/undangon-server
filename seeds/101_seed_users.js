import { localStrategy } from '../src/authentication.js';
import { USER_ROLES } from '../src/services/users/users.schema.js';

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('users').del();

  let password = await localStrategy.hashPassword('admin');
  let defaultPassword = await localStrategy.hashPassword('123');

  await knex('users').insert([
    {
      id: 1,
      name: 'Administrator',
      email: 'admin@undangon.space',
      role: USER_ROLES.ADMIN,
      password
    },
    {
      id: 10,
      name: 'user-1',
      email: 'user1@undangon.space',
      role: USER_ROLES.USER,
      password: defaultPassword
    },
    {
      id: 11,
      name: 'user-2',
      email: 'user2@undangon.space',
      role: USER_ROLES.USER,
      password: defaultPassword
    },
    {
      id: 12,
      name: 'user-3',
      email: 'user3@undangon.space',
      role: USER_ROLES.MAINTAINER,
      password: defaultPassword
    }
  ]);
}
