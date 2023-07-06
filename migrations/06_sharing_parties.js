import { SHARING_TYPE } from '../src/services/sharing_parties/sharing_parties.schema.js';

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.createTable('sharing_parties', (table) => {
    const type = Object.values(SHARING_TYPE);
    table.increments('id');
    table.enum('type', type).notNullable().defaultTo('private');
  });
  await knex.schema.alterTable('invitations', (table) => {
    table
      .integer('sharing_party_id')
      .unsigned()
      .references('id')
      .inTable('sharing_parties')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
      .nullable();
  });
  await knex.schema.alterTable('templates', (table) => {
    table
      .integer('sharing_party_id')
      .unsigned()
      .references('id')
      .inTable('sharing_parties')
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
    table.dropForeign('sharing_party_id');
  });
  await knex.schema.table('templates', (table) => {
    table.dropForeign('sharing_party_id');
  });
  await knex.schema.dropTable('sharing_parties');
}
