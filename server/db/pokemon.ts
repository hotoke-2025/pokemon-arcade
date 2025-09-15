import db from './connection.ts'
import { Pokemon, PokemonGeneration } from '../../models/pokemonList.ts'
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

export async function addPokemon(data: PokemonGeneration) {
  const [id] = await db('caught_pokemon').insert(data)
  return id
}

