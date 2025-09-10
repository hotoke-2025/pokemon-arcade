import request from 'superagent'
import type { Pokemon } from '../../models/pokemonList.ts'

export async function fetchPokemonById(id: number) {
  const res = await request.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
  return res.body as Pokemon
}
