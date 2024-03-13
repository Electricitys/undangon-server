/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('packages').del()
  await knex('packages').insert([
    { id: 1, name: 'Bronze', price: 75000 },
    { id: 2, name: 'Silver', price: 100000 },
    { id: 3, name: 'Gold', price: 150000 },
    { id: 4, name: 'Platinum', price: 200000 },
    { id: 5, name: 'Diamond', price: 300000 },
    { id: 6, name: 'Ruby', price: 400000 }
  ])
}
