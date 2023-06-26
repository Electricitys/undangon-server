import { knexHelper } from '../knexHelper.js';

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.createTable('categories', (table) => {
    table.increments('id');
    table.string('name');

    knexHelper.table_timestamp(knex, table);
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.dropTable('categories');
}
