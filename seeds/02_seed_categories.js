/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('categories').del()
  await knex('categories').insert([
    { id: 100, name: 'Wedding' },
    { id: 101, name: 'Birthday' },
    { id: 102, name: 'Event' }
  ])
}
