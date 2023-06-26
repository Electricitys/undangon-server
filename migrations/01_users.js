import { knexHelper } from '../knexHelper.js';
import { localStrategy } from '../src/authentication.js';
import { USER_ROLES } from '../src/services/users/users.schema.js';

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.createTable('users', (table) => {
    const roles = Object.values(USER_ROLES);
    table.increments('id').primary();
    table.string('name');
    table.string('email').unique();
    table.string('password');
    table.string('googleId').unique();
    table.enum('role', roles).notNullable().defaultTo('public');

    knexHelper.table_timestamp(knex, table);
  });

  let password = await localStrategy.hashPassword('admin');

  await knex('users').insert({
    name: 'Administrator',
    email: 'admin@undangon.space',
    password: `${password}`,
    role: USER_ROLES.ADMIN
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.dropTableIfExists('users');
}
