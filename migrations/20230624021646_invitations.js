/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.createTable('invitations', (table) => {
    table.increments('id')
    table.string('name')
    table.text('content', 'longtext')
    table.string('slug')

    table.timestamps(true, true)

    table.integer('user_id').unsigned().references('id').inTable('users')
    table.integer('category_id').unsigned().references('id').inTable('categories')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.dropTable('invitations')
}
