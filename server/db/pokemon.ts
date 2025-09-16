import db from './connection.ts'
import { Pokemon} from '../../models/pokemonList.ts'
// import knex from 'knex'

export async function getUsersWithPokemon() {
  const users = await db('users')
  const caughtPokemon = await db('caught_pokemon')

  return users.map(user => ({
    ...user,
    caught_pokemon: caughtPokemon.filter(p => p.user_id === user.id),
  }))
}

export async function getAllPokemons() {
  return await db('caught_pokemon')
}

export async function getPokemonById(id: number | string) {
  const pokemon = await db('caught_pokemon').select().first().where({ id })
  return pokemon as Pokemon
}

export async function addPokemon(pokemon: {name: string
  nickname: string
  released: boolean
  user_id: string
  image?: string
}) {
  console.log('Saving pokemon:', pokemon)
  const [id] = await db('caught_pokemon').insert(pokemon)
  return id
}

export async function deletePokemon(id: number) {
  return await db('caught_pokemon').where({ id }).del()
}

export async function getPokemonsByUserId(user_id: string) {
  return await db('caught_pokemon').where({ user_id })
}

export async function syncUser(auth0UserId: string) {
  const user = await getUserById(auth0UserId)
  if (!user) {
    await createUser({ id: auth0UserId })
  }
}

export async function getUserById(id: string) {
  const result = await db('users').where({ id }).first()
  return result || null
}

export async function createUser(user: { id: string }) {
  await db('users').insert(user)
}

export async function updateNickname(id: number, nickname: string, user_id: string) {
  return db('caught_pokemon')
    .where({ id, user_id })
    .update({ nickname })
}


