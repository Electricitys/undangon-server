import { knexHelper } from '../knexHelper.js';

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.createTable('metadata', (table) => {
    table.increments('id');
    table.string('title');
    table.string('description');
    table.string('url');
    table.string('image');
    table.string('image_width');
    table.string('image_height');

    knexHelper.table_timestamp(knex, table);
  });

  await knex.schema.alterTable('invitations', (table) => {
    table
      .integer('metadata_id')
      .unsigned()
      .references('id')
      .inTable('metadata')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
      .nullable();
  });

  await knex.schema.alterTable('templates', (table) => {
    table
      .integer('metadata_id')
      .unsigned()
      .references('id')
      .inTable('metadata')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
      .nullable();
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.table('invitations', (table) => {
    table.dropForeign('metadata_id');
  });
  await knex.schema.table('templates', (table) => {
    table.dropForeign('metadata_id');
  });
  await knex.schema.dropTable('metadata');
}
