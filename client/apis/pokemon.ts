import request from 'superagent'

const rootURL = new URL(`/api/v1`, document.baseURI)

export async function getPokemon(): Promise<string[]> {
  const response = await request.get(`${rootURL}/pokemon`)
  return response.body.pokemon as string[]
}
