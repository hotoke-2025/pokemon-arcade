/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  await knex('caught_pokemon').del()
  await knex('caught_pokemon').insert([
    {
      id: '1',
      name: 'Growlithe',
      nickname: 'G',
      released: false,
      user_id: 1,
    },
    { id: '2', name: 'Mew', nickname: 'M', released: false, user_id: 2 },
    { id: '3', name: 'Squirtle', nickname: 'S', released: false, user_id: 3 },
    { id: '4', name: 'Pikachu', nickname: 'P', released: false, user_id: 4 },
    { id: '5', name: 'Tepig', nickname: 'T', released: false, user_id: 5 },
  ])
}
