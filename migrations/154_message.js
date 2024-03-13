import { knexHelper } from '../knexHelper.js';

export async function up(knex) {
  await knex.schema.createTable('messages', (table) => {
    table.increments('id');
    table.string('title');
    table.string('message');
    table.string('token');

    knexHelper.table_timestamp(knex, table);
  });
}

export async function down(knex) {
  await knex.schema.dropTable('messages');
}
