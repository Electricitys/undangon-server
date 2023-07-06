/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.createTable('sharing_party_email_address', (table) => {
    table.increments('id');
    table.string('user_email').references('email').inTable('users').onUpdate('CASCADE').onDelete('CASCADE');
    table
      .integer('sharing_party_id')
      .unsigned()
      .references('id')
      .inTable('sharing_parties')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.dropTable('sharing_party_email_address');
}
