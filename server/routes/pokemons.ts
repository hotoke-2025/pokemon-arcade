import { Router } from 'express'
// import checkJwt, { JwtRequest } from '../auth0.ts'
// import { StatusCodes } from 'http-status-codes'

import * as db from '../db/pokemon.ts'

const router = Router()

router.get('/', async (req, res) => {
  try {
    const pokemons = await db.getAllPokemons()

    res.json({ pokemons: pokemons.map((pokemon) => pokemon.name) })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

router.get('/users', async (req, res) => {
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

// router.post('/', checkJwt, async (req: JwtRequest, res, next) => {
//   if (!req.auth?.sub) {
//     res.sendStatus(StatusCodes.UNAUTHORIZED)
//     return
//   }

//   try {
//     const { owner, name } = req.body
//     const id = await db.addPokemon({ owner, name })
//     res
//       .setHeader('Location', `${req.baseUrl}/${id}`)
//       .sendStatus(StatusCodes.CREATED)
//   } catch (err) {
//     next(err)
//   }
// })

export default router
