/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('templates').del()

  await knex('templates').insert([
    {
      name: 'Template One',
      user_id: 10,
      category_id: 100
    },
    {
      name: 'Template Two',
      user_id: 10,
      category_id: 101
    },
    {
      name: 'Template Three',
      user_id: 12,
      category_id: 101
    }
  ])
}
