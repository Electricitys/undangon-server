/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

export async function up(knex) {
  await knex.schema.createTable('templates', (table) => {
    table.increments('id').primary()
    table.string('name').notNullable()
    table.text('content', 'longtext')
    table.string('thumbnail_url')

    table.integer('user_id').unsigned().references('id').inTable('users')

    table.timestamps(true, true)
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.dropTable('templates')
}
