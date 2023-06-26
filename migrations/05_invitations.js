import { knexHelper } from '../knexHelper.js';

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.createTable('invitations', (table) => {
    table.increments('id');
    table.string('name');
    table.text('content', 'longtext');
    table.string('slug').unique();

    table
      .integer('user_id')
      .unsigned()
      .references('id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    table
      .integer('category_id')
      .unsigned()
      .references('id')
      .inTable('categories')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    table
      .integer('package_id')
      .unsigned()
      .references('id')
      .inTable('packages')
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
  await knex.schema.dropTable('invitations');
}
