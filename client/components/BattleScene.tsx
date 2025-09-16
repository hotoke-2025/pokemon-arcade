// To do:
// Display whole background image
// Move pokemon sprite to the top right of the background image
// Text and buttons to display over the background image and in pixelly font
// Have a health bar that goes down by a quarter with each click of the "fight" button before the explosion gif and "you won" message appears.

import { Link } from 'react-router'
import { useParams } from 'react-router'
import { useState } from 'react'
import { Explosion } from './Explosion.tsx'
import { useAuth0 } from '@auth0/auth0-react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { fetchPokemonById, addPokedex, AddPokedexInput, CaughtPokemon } from '../apis/pokemon'


export default function ShowPokemon() {
  const { monId } = useParams()
  const [showExplosion, setShowExplosion] = useState(false)
  const [health, setHealth] = useState(100)
  const { isAuthenticated, getAccessTokenSilently } = useAuth0()
  const queryClient = useQueryClient()

  const {
    data: pokemon,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ['pokemon', monId],
    queryFn: () => fetchPokemonById(Number(monId)),
  })

   const addPokemonMutation = useMutation< CaughtPokemon, Error, AddPokedexInput & { token: string }>({
  mutationFn: ({ token, ...pokemon }) => addPokedex(pokemon, token),
  onSuccess: () => {
    queryClient.invalidateQueries({queryKey: ['pokedex']})
  },
  onError: (error: Error) => {
    console.log(error.message || 'Failed to add pokemon')
  },
})

  if (isPending) {
    return <>Loading...</>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  const handleFight= async () => {
    if (health > 25) {
      setHealth(health - 25)
    } else {
      setHealth(0)
      setShowExplosion(true)
      if (isAuthenticated){
        try {
          const token = await getAccessTokenSilently()
          await addPokemonMutation.mutateAsync({
          name: pokemon.name,
          nickname: '',
          released: false,
          token,
          image: pokemon.sprites.front_default,
        })
      } catch (error){
        console.error('Failed to add pokemon:', error)
      }
    }
  }}

  return (
    <>
      <h1>
        A wild {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}{' '}
        has appeared...
      </h1>
      <div className="pokemon-container">
        {/* (change this^ to pokemon-container to revert back to game2 baground) */}
        <div>
          <img
            className=""
            src={pokemon.sprites.front_default}
            alt={`Front Default Sprite for ${pokemon.name}`}
          />
        </div>
        <div className="health-bar">
          <div className="health-fill" style={{ width: `${health}%` }}></div>
        </div>
      </div>
      <div className="battle-text">
        <h1>What will you do?</h1>
        <button
          id="fightBtn"
          className="m-5 p-9"
          onClick={handleFight}
        >
          {' '}
          Fight! {showExplosion && <Explosion />}
        </button>
        <button>
          <Link id="backBtn" to={'/game-1'} className="m-5 p-9">
            {' '}
            Run Away{' '}
          </Link>
        </button>
      </div>
    </>
  )
}
