import request from 'superagent'
import type { Pokemon } from '../../models/pokemonList.ts'
const rootURL = new URL(`/api/v1`, document.baseURI)

export async function fetchPokemonById(id: number) {
  const res = await request.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
  return res.body as Pokemon
}
export interface CaughtPokemon {
  id: number
  name: string
  nickname: string
  released: boolean
  user_id?: number
}
export interface AddPokedexInput {
  name: string
  nickname: string
  released: boolean
  user_id?: number
  image: string
}

export async function addPokedex(pokemon: AddPokedexInput, token: string) {
  const result = await request.post(`${rootURL}/pokedex`).set('Authorization', `Bearer ${token}`).send(pokemon)
  return result.body
}

export async function deletePokedex(id: number) {
  await request.delete(`${rootURL}/pokedex/${id}`)
}

export async function updateNickname(id: number, nickname: string, token: string) {
  await request
    .patch(`${rootURL}/pokedex/${id}`)
    .set('Authorization', `Bearer ${token}`)
    .send({ nickname })
}
