import { SHARING_TYPE } from '../src/services/sharing_parties/sharing_parties.schema.js';

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('sharing_parties').del();
  await knex('sharing_party_email_address').del();
  await knex('sharing_parties').insert([
    { id: 1, type: SHARING_TYPE.PUBLIC },
    { id: 2, type: SHARING_TYPE.PRIVATE },
    { id: 3, type: SHARING_TYPE.PUBLIC }
  ]);

  await knex('sharing_party_email_address').insert([
    { user_email: 'user1@undangon.space', sharing_party_id: 1 },
    { user_email: 'user2@undangon.space', sharing_party_id: 1 },
    { user_email: 'user3@undangon.space', sharing_party_id: 3 }
  ]);

  await knex('invitations').where({ id: 1 }).update({ sharing_party_id: 1 });
  await knex('invitations').where({ id: 2 }).update({ sharing_party_id: 2 });
  await knex('invitations').where({ id: 3 }).update({ sharing_party_id: 3 });
}
