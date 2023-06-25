/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.createTable('categories', (table) => {
    table.increments('id')
    table.string('name')

    table.timestamps(true, true)
  })
  await knex.schema.alterTable('templates', (table) => {
    table.integer('category_id').unsigned().references('id').inTable('categories')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.alterTable('templates', (table) => {
    table.dropColumn('categoryId')
  })
  await knex.schema.dropTable('categories')
}
