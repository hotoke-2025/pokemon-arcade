/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  await knex('users').del()
  await knex('users').insert([
    {
      id: 1,
      nickname: 'Annie',
      sprite: '/images/player-sprite-standing-facing-forwards.png',
    },
    {
      id: 2,
      nickname: 'Aeron',
      sprite: '/images/player-sprite-standing-facing-forwards.png',
    },
    {
      id: 3,
      nickname: 'Kaylin',
      sprite: '/images/player-sprite-standing-facing-forwards.png',
    },
    {
      id: 4,
      nickname: 'Nixon',
      sprite: '/images/player-sprite-standing-facing-forwards.png',
    },
    {
      id: 5,
      nickname: 'Rena',
      sprite: '/images/player-sprite-standing-facing-forwards.png',
    },
  ])
}
