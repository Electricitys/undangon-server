import { knexHelper } from '../knexHelper.js';

export async function up(knex) {
  await knex.schema.createTable('preset_types', (table) => {
    table.increments('id');
    table.string('label');
    table.string('description').nullable();

    knexHelper.table_timestamp(knex, table);
  });
}

export async function down(knex) {
  await knex.schema.dropTable('preset_types');
}
