/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('preset_types').del();
  await knex('preset_types').insert([
    {
      id: 10,
      label: 'Dialog',
      description: 'Dialog templates'
    },
    {
      id: 11,
      label: 'Section 1'
    },
    {
      id: 12,
      label: 'Section 2'
    },
    {
      id: 13,
      label: 'Section 3'
    },
    {
      id: 14,
      label: 'Gallery'
    },
    {
      id: 15,
      label: 'Wedding Gift'
    }
  ]);
  await knex('presets').del();
  await knex('presets').insert([
    {
      label: 'Dialog 1',
      user_id: 10,
      type_id: 10
    },
    {
      label: 'Blueberry Heading',
      user_id: 10,
      type_id: 11
    },
    {
      label: 'Sync Hour',
      user_id: 10,
      type_id: 11
    }
  ]);
}
