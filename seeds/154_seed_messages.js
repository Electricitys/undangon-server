/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('messages').del();
  await knex('messages').insert([
    { id: 1, title: 'Message One', message: 'Lorem ipsum dolor sit amet', token: "example" },
    { id: 2, title: 'Message Two', message: 'Lorem ipsum dolor sit amet', token: "example" },
    { id: 3, title: 'Message Three', message: 'Lorem ipsum dolor sit amet', token: "example" }
  ]);
}
