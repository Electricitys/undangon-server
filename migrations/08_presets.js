import { knexHelper } from '../knexHelper.js';

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.createTable('presets', (table) => {
    table.increments('id');
    table.string('content', 'longtext');
    table.string('thumbnail', 'longtext');

    table
      .integer('user_id')
      .unsigned()
      .references('id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');

    knexHelper.table_timestamp(knex, table);
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.dropTable('presets');
}
