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
}) {
  const [id] = await db('caught_pokemon').insert(pokemon)
  return id
}

export async function deletePokemon(id: number) {
  return await db('caught_pokemon').where({ id }).del()
}

export async function getPokemonsByUserId(user_id: string) {
  return await db('caught_pokemon').where({ user_id })
}

