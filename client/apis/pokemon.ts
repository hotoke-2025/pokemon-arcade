import request from 'superagent'
import type { Pokemon } from '../../models/pokemonList.ts'

const rootURL = new URL(`/api/v1`, document.baseURI)

export async function fetchPokemonById(id: number) {
  const res = await request.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
  return res.body as Pokemon
}

export async function addPokedex(pokemon: {
  id: number
  name: string
  nickname: string
  released: boolean
  user_id: number
}) {
  const result = await request.post(`${rootURL}/pokedex`).send(pokemon)
  return result.body
}

export async function deletePokedex(id: number) {
  await request.delete(`${rootURL}/pokedex/${id}`)
}