import { localStrategy } from '../src/authentication.js'

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.createTable('users', (table) => {
    table.increments('id').primary()
    table.string('name')
    table.string('email').unique()
    table.string('password')
    table.string('googleId').unique()

    table.timestamps(true, true)
  })

  let password = await localStrategy.hashPassword('admin')

  await knex('users').insert({
    name: 'Administrator',
    email: 'admin@undangon.space',
    password: `${password}`
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.dropTableIfExists('users')
}
