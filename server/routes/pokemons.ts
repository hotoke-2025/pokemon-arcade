import { Router } from 'express'
import checkJwt, { JwtRequest } from '../auth0.ts'
import { StatusCodes } from 'http-status-codes'

import * as db from '../db/pokemon.ts'

const router = Router()

router.get('/', async (req, res) => {
  try {
    const pokemons = await db.getAllPokemons()
    res.json({ pokemons })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

router.get('/user', async (req, res) => {
  try {
    const usersWithPokemon = await db.getUsersWithPokemon()
    res.json(usersWithPokemon)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Could not fetch user Pokémon data' })
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const pokemon = await db.getPokemonById(req.params.id)
    res.json(pokemon)
  } catch (err) {
    next(err)
  }
})

// deletes pokemon from pokedex
router.delete('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)
    await db.deletePokemon(id)
    res.sendStatus(204)
  } catch (e) {
    console.log(e)
  }
})
// adds pokemon to pokedex

router.post('/', checkJwt, async (req: JwtRequest, res, next) => {
  if (!req.auth?.sub) {
    res.sendStatus(StatusCodes.UNAUTHORIZED)
    return
  }
  try {
    const user_id = req.auth.sub
    await db.syncUser(user_id)
    const { name, nickname, released, image } = req.body
    const id = await db.addPokemon({ name, nickname, released, user_id, image })
    res
      .setHeader('Location', `${req.baseUrl}/${id}`)
      .sendStatus(StatusCodes.CREATED)
  } catch (err) {
    next(err)
  }
})

// auth0 pokedex
router.get('/mine', checkJwt, async (req: JwtRequest, res) => {
  if (!req.auth?.sub) {
    res.sendStatus(StatusCodes.UNAUTHORIZED)
    return
  }

  const user_id = req.auth.sub
  const pokemons = await db.getPokemonsByUserId(user_id)
  res.json({ pokemons })
})

// updating nicknames
router.patch('/:id', checkJwt, async (req: JwtRequest, res) => {
  if (!req.auth?.sub) {
    return res.sendStatus(StatusCodes.UNAUTHORIZED)
  }

  const id = Number(req.params.id)
  const { nickname } = req.body

  try {
    await db.updateNickname(id, nickname, req.auth.sub)
    res.sendStatus(StatusCodes.NO_CONTENT)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Could not update nickname' })
  }
})


export default router
