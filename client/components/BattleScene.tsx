import { Link } from 'react-router'
import { useParams } from 'react-router'
import { useState } from 'react'
import { Explosion } from './Explosion.tsx'
import { useAuth0 } from '@auth0/auth0-react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  fetchPokemonById,
  addPokedex,
  AddPokedexInput,
  CaughtPokemon,
} from '../apis/pokemon'

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

  const addPokemonMutation = useMutation<
    CaughtPokemon,
    Error,
    AddPokedexInput & { token: string }
  >({
    mutationFn: ({ token, ...pokemon }) => addPokedex(pokemon, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pokedex'] })
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

  const handleFight = async () => {
    if (health > 25) {
      setHealth(health - 25)
    } else {
      setHealth(0)
      setShowExplosion(true)
      if (isAuthenticated) {
        try {
          const token = await getAccessTokenSilently({
            authorizationParams: {
              audience: 'https://pokemon-arcade/api',
            },
          })
          console.log('Attempting to add pokemon', pokemon.name)
          await addPokemonMutation.mutateAsync({
            name: pokemon.name,
            nickname: '',
            released: false,
            token,
            image: pokemon.sprites.front_default,
          })
        } catch (error) {
          console.error('Failed to add pokemon:', error)
        }
      }
    }
  }

  return (
    <>
      <h1>
        A wild {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}{' '}
        has appeared...
      </h1>

      <div className="pokemon-container pokemon-container-bg">
        <div>
          <img
            className=""
            src={pokemon.sprites.front_default}
            alt={`Front Default Sprite for ${pokemon.name}`}
          />
          {showExplosion && <Explosion />}
        </div>

        <div className="health-bar">
          <div className="health-fill" style={{ width: `${health}%` }}></div>
        </div>
      </div>
      <div className="battle-text buttonBorder">
        <h1>What will you do?</h1>
        <button
          id="fightBtn"
          className="fightButton actionButton m-5 p-9"
          onClick={handleFight}
        >
          {' '}
          Fight!
        </button>
        <button>
          <Link id="backBtn" to={'/game-1'} className="actionButton runButton">
            {' '}
            Run Away{' '}
          </Link>
        </button>
      </div>
    </>
  )
}
