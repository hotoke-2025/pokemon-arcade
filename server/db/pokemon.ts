import db from './connection.ts'
import { Pokemon, PokemonGeneration } from '../../models/pokemonList.ts'

export async function getAllPokemons() {
  const pokemon = await db('pokemon').select()
  return pokemon as Pokemon[]
}

export async function getPokemonById(id: number | string) {
  const pokemon = await db('pokemon').select().first().where({ id })
  return pokemon as Pokemon
}

export async function addPokemon(data: PokemonGeneration) {
  const [id] = await db('pokemon').insert(data)
  return id
}
