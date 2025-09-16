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
      image:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/58.png',
    },
    {
      id: '2',
      name: 'Mew',
      nickname: 'M',
      released: false,
      user_id: 2,
      image:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/151.png',
    },
    {
      id: '3',
      name: 'Squirtle',
      nickname: 'S',
      released: false,
      user_id: 3,
      image:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png',
    },
    {
      id: '4',
      name: 'Pikachu',
      nickname: 'P',
      released: false,
      user_id: 4,
      image:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
    },
    {
      id: '5',
      name: 'Tepig',
      nickname: 'T',
      released: false,
      user_id: 5,
      image:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/498.png',
    },
  ])
}
