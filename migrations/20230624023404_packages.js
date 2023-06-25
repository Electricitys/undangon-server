/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.createTable('packages', (table) => {
    table.increments('id')
    table.string('name')
    table.string('description')

    table.integer('price')

    table.timestamps(true, true)
  })
  await knex.schema.alterTable('invitations', (table) => {
    table.integer('package_id').unsigned().references('id').inTable('packages')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.alterTable('invitations', (table) => {
    table.dropColumn('package_id')
  })
  await knex.schema.dropTable('packages')
}
