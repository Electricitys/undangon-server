/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('invitations').del();
  await knex('invitations').insert([
    {
      name: 'Invitation One',
      slug: 'invitation-one',
      user_id: 11,
      category_id: 100,
      package_id: 3
    },
    {
      name: 'Invitation Two',
      slug: 'invitation-two',
      user_id: 11,
      category_id: 101,
      package_id: 4
    },
    {
      name: 'Invitation Three',
      slug: 'invitation-three',
      user_id: 12,
      category_id: 101,
      package_id: 2
    }
  ]);
}
